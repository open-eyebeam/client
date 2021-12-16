import * as Colyseus from "colyseus.js"
import { writable, get } from 'svelte/store';
import { nanoid } from "../global.js"


import {
    localPlayer
} from "../local-player/local-player.js";

export const players = writable({})
export const chatMessages = writable([])
export const showTarget = writable(false)
export const targetX = writable(0)
export const targetY = writable(0)

const GAME_SERVER_URL = "wss://open.eyebeam.dev";
// const GAME_SERVER_URL = "ws://localhost:2567"

// Public functions
export let moveTo = {}
export let goToRoom = {}
export let onboardUser = {}
export let submitChat = {}

// Public variables
export let moveQ = []

let disconnectionCode = 0
let reconnectionAttempts = 0

// __ Connect to Colyseus gameserver
const gameClient = new Colyseus.Client(GAME_SERVER_URL)

export const connectToGameServer = playerObject => {
    return new Promise((resolve, reject) => {

        // console.log('Initializing world')
        // __ Join game room
        gameClient
            .joinOrCreate("game", playerObject)
            .then(gameRoom => {
                // ******
                // PLAYER
                // ******

                // PLAYER => REMOVE
                gameRoom.state.players.onRemove = (player, sessionId) => {
                    // console.log("__REMOVE", player)
                    players.update(ps => {
                        delete ps[player.uuid]
                        return (ps)
                    })
                }

                // PLAYER => ADD
                gameRoom.state.players.onAdd = (player, sessionId) => {
                    // console.log("__ADD", player)

                    players.update(ps => {
                        // console.log(ps)
                        ps[player.uuid] = {
                            name: player.name,
                            x: player.x,
                            y: player.y,
                            room: player.room,
                            npc: player.npc,
                            inTransit: false,
                            self: player.uuid === get(localPlayer).uuid,
                        }
                        return (ps)
                    })

                    // This is the local player
                    if (player.uuid === get(localPlayer).uuid) {
                        // console.log('player', player)
                        localPlayer.update(lp => {
                            lp.sessionId = sessionId
                            lp.name = player.name
                            return lp
                        })
                        // if (player.onboarded) {
                        //     // setUIState(STATE.READY)
                        // }
                    }

                    // PLAYER => CHANGE
                    player.onChange = changes => {
                        // console.log("__CHANGE", player)
                        if (get(players)[player.uuid].room !== player.room) {
                            // console.log('!!! NEW ROOM')
                            players.update(ps => {
                                ps[player.uuid].name = player.name
                                ps[player.uuid].shape = player.shape
                                ps[player.uuid].room = player.room
                                ps[player.uuid].inTransit = true
                                return (ps)
                            })
                            setTimeout(() => {
                                // console.log('!!! TRANSTION DNO')
                                players.update(ps => {
                                    ps[player.uuid].inTransit = false
                                    return (ps)
                                })
                            }, 1000)
                        } else {
                            players.update(ps => {
                                ps[player.uuid].name = player.name
                                ps[player.uuid].shape = player.shape
                                return (ps)
                            })
                        }

                        // IGNORE LOCAL KEYBOARD NAVIGATION
                        if (
                            player.uuid === get(localPlayer).uuid &&
                            player.path.keyboardNavigation
                        ) {
                            return
                        }
                        if (player.path.waypoints.length > 0) {
                            if (player.uuid === get(localPlayer).uuid) {
                                targetX.set(player.x)
                                targetY.set(player.y)
                                showTarget.set(true)
                            }
                            // __ Normal movement
                            moveQ[player.uuid] = player.path.waypoints.filter(
                                (_, i) => (i + 1) % 5
                            )
                        }

                        // ONBOARDING COMPLETED
                        // if (player.onboarded && !get(players)[player.uuid].onboarded) {
                        //     // console.log("ONBOARDING COMPLETED")
                        //     // console.log(player)
                        //     players[player.uuid].onboarded = true
                        //     players[player.uuid].name = player.name
                        //     players[player.uuid].shape = player.shape

                        //     if (player.uuid === get(localPlayer).uuid && !get(isAuthenticated)) {
                        //         // Cookies.set("open-eyebeam__shape", player.shape)
                        //         // Cookies.set("open-eyebeam__name", player.name)
                        //     }
                        //     // !!! Ignore movements on load
                        //     return
                        // }


                    }
                }

                // PLAYER => BANNED
                gameRoom.onMessage("banned", message => {
                    // setUIState(STATE.ERROR, "You have been banned")
                })

                moveTo = (x, y, keyboardNavigation) => {
                    // console.log(x, y)
                    delete moveQ[get(localPlayer).uuid]
                    showTarget.set(false)
                    // console.log('get(players)', get(players))
                    if (keyboardNavigation) {
                        gameRoom.send("go", {
                            x: x,
                            y: y,
                            keyboardNavigation: true,
                        })
                    } else {
                        gameRoom.send("go", {
                            x: x,
                            y: y,
                            originX: get(players)[get(localPlayer).uuid].x,
                            originY: get(players)[get(localPlayer).uuid].y,
                            keyboardNavigation: false,
                        })
                    }
                }

                goToRoom = room => {
                    console.log(room)
                    gameRoom.send("changeRoom", {
                        id: room.id,
                        x: room.x,
                        y: room.y,
                    })
                }

                // onboardUser = (username, shape) => {
                //     // console.log("username", username)
                //     // console.log("shape", shape)
                //     gameRoom.send("onboard", {
                //         username: username,
                //         shape: shape,
                //     })
                //     // setUIState(STATE.READY)
                // }



                // *******
                // MESSAGE
                // *******

                // MESSAGE => ADD
                gameRoom.state.messages.onAdd = message => {
                    chatMessages.update(cM => {
                        cM.push(message)
                        // = [...chatMessages, message]
                        return cM
                    })
                }

                // MESSAGE => REMOVE
                // gameRoom.onMessage("nukeMessage", msgIdToRemove => {
                //     const itemIndex = chatMessages.findIndex(
                //         m => m.msgId === msgIdToRemove
                //     )
                //     chatMessages.splice(itemIndex, 1)
                //     chatMessages = chatMessages
                // })

                // MESSAGE => SUBMIT
                submitChat = (event, currentRoom) => {
                    console.log('submitting chat')
                    // console.log('get(localPlayer).uuid', get(localPlayer).uuid)
                    // console.log('get(players)[get(localPlayer).uuid].name', get(players)[get(localPlayer).uuid].name)
                    try {
                        gameRoom.send("submitChatMessage", {
                            msgId: nanoid(),
                            uuid: get(localPlayer).uuid,
                            name: get(players)[get(localPlayer).uuid].name,
                            text: event.detail.text,
                            room: currentRoom._id,
                        })
                    } catch (err) {
                        // setUIState(STATE.ERROR, err)
                        console.dir(err)
                    }
                }

                // ******************************
                // CLIENT LEFT / WAS DISCONNECTED
                // ******************************
                gameRoom.onLeave(code => {
                    const exitMsg = "Disconnected from server. Code: " + code
                    console.log(exitMsg);
                    // __ Show notification of disconnection
                    // setUIState(STATE.DISCONNECTED)
                    disconnectionCode = code
                    reconnectionAttempts = 1
                    // TODO: Try to reconnect
                    // const reconnect = i => {
                    //     console.log(
                    //         "Trying to reconnect user:",
                    //         get(localUserSessionID),
                    //         "....",
                    //         i
                    //     )
                    //     gameClient
                    //         .reconnect("game", get(localUserSessionID))
                    //         .then(room => {
                    //             // __ Successfully reconnected
                    //             // setUIState(STATE.READY)
                    //         })
                    //         .catch(e => {
                    //             console.error("join error", e)
                    //         })
                    //     //   setInterval(() => {
                    //     //   reconnectionAttempts++
                    //     // }, 5000)
                    // }
                    // reconnect(1)
                })

                // ************************
                // GENERAL ERROR HANDLING
                // ************************
                gameRoom.onError((code, message) => {
                    // setUIState(STATE.ERROR, message)
                    console.error("Gameserver error:", message)
                })

                // DONE
                resolve()
            })
            .catch(e => {
                console.dir(e)
                if (e.code == 4215) {
                    // setUIState(STATE.ERROR, "You have been banned")
                } else {
                    // setUIState(STATE.ERROR, "FAILED TO CONNECT TO GAMESERVER")
                }
                reject(e)
            })
    })
}