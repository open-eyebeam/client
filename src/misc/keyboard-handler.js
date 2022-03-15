import { writable, get } from "svelte/store"
import { throttle } from 'lodash'
import {
    players, moveTo,
} from "../core/core.js"
import { localPlayer } from "../local-player/local-player.js"
import {
    currentRoom,
} from "../stores.js"
import { GRID_SIZE } from "../data.js"

export const pressedKeys = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false,
}

export const keyReleased = writable(true)

// $: console.log('keyReleased', get(keyReleased))

export const initializeKeyboardHandler = () => {
    return new Promise((resolve, reject) => {
        // PLAYER => KEY DOWN
        document.addEventListener("keydown", throttle(key => {
            // if (get(keyReleased)) {
            // W Key is 87 & Up arrow is 87
            if (key.keyCode === 38) {
                pressedKeys["UP"] = true
                keyReleased.set(false)

                if (get(players)[get(localPlayer).uuid].y > 0) {
                    players.update(ps => {
                        ps[get(localPlayer).uuid].y -= 1
                        return ps
                    })
                }

            }
            // S Key is 83 & Down arrow is 40
            if (key.keyCode === 40) {
                pressedKeys["DOWN"] = true
                keyReleased.set(false)
                if (
                    get(players)[get(localPlayer).uuid].y * GRID_SIZE <
                    get(currentRoom).dimensions.height * GRID_SIZE - 30
                ) {
                    players.update(ps => {
                        ps[get(localPlayer).uuid].y += 1
                        return ps
                    })
                }
            }
            // A Key is 65 & Left arrow is 37
            if (key.keyCode === 37) {
                pressedKeys["LEFT"] = true
                keyReleased.set(false)
                if (get(players)[get(localPlayer).uuid].x > 0) {
                    players.update(ps => {
                        ps[get(localPlayer).uuid].x -= 1
                        return ps
                    })
                }
            }
            // D Key is 68 & Right arrow is 39
            if (key.keyCode === 39) {
                pressedKeys["RIGHT"] = true
                keyReleased.set(false)
                if (
                    get(players)[get(localPlayer).uuid].x <
                    get(currentRoom).dimensions.width * GRID_SIZE - 30
                ) {
                    players.update(ps => {
                        ps[get(localPlayer).uuid].x += 1
                        return ps
                    })
                }
            }

            moveTo(
                get(players)[get(localPlayer).uuid].x,
                get(players)[get(localPlayer).uuid].y,
                true
            )
            // checkPortalOverlap()
            // checkZoneOverlap()
            pressedKeys["UP"] = false
            pressedKeys["DOWN"] = false
            pressedKeys["LEFT"] = false
            pressedKeys["RIGHT"] = false
            // }
        }, 100))
        // PLAYER => KEY UP
        document.addEventListener("keyup", key => {
            // console.log('keyup')
            keyReleased.set(true)
        })
        resolve()
    })
}