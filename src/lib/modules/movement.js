// * * * * * * * * * * * * * * * * * * * * * * * * * * * 
//
//  movement.js =>
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * *

import { writable, get } from "svelte/store"
import inRange from "lodash/inRange.js"
import throttle from 'lodash/throttle.js'
import { players, moveTo } from "$lib/modules/engine.js"
import { GRID_SIZE, localPlayer } from "$lib/modules/world.js"

// *** VARIABLES
export const roomIntent = writable(false)
export const objectIntent = writable(false)
export const activeZone = writable(false)
export const currentRoom = writable(false)

export const pressedKeys = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false,
}
export const keyReleased = writable(true)

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
                    get(currentRoom).dimensions.height * GRID_SIZE - 60
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
                    get(players)[get(localPlayer).uuid].x * GRID_SIZE <
                    get(currentRoom).dimensions.width * GRID_SIZE - 60
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

            pressedKeys["UP"] = false
            pressedKeys["DOWN"] = false
            pressedKeys["LEFT"] = false
            pressedKeys["RIGHT"] = false
            // }
        }, 200))
        // PLAYER => KEY UP
        document.addEventListener("keyup", key => {
            keyReleased.set(true)
        })
        resolve()
    })
}

export const checkPortalOverlap = () => {
    if (get(currentRoom).portals && Array.isArray(get(currentRoom).portals)) {
        let overlapIndex = false
        get(currentRoom).portals.forEach(p => {
            if (
                get(players)[get(localPlayer).uuid].x === p.x &&
                get(players)[get(localPlayer).uuid].y === p.y
            ) {
                overlapIndex = p.targetArea._id
            }
        })
        if (overlapIndex) {
            roomIntent.set(overlapIndex)
        } else {
            roomIntent.set(false)
        }
    }
}

export const checkObjectOverlap = () => {
    if (get(currentRoom).objects && Array.isArray(get(currentRoom).objects)) {
        let overlapIndex = false
        get(currentRoom).objects.forEach(o => {
            if (
                inRange(get(players)[get(localPlayer).uuid].x, o.x, o.x + o.dimensions.width) &&
                inRange(get(players)[get(localPlayer).uuid].y, o.y, o.y + o.dimensions.height)
            ) {
                overlapIndex = o._id
            }
        })
        if (overlapIndex) {
            console.log("OBJECT =>", overlapIndex)
            objectIntent.set(overlapIndex)
        } else {
            objectIntent.set(false)
        }
    }
}

export const checkZoneOverlap = () => {
    let overlapIndex = false
    get(currentRoom).zones.forEach(z => {
        if (
            inRange(get(players)[get(localPlayer).uuid].x, z.x, z.x + z.dimensions.width) &&
            inRange(get(players)[get(localPlayer).uuid].y, z.y, z.y + z.dimensions.height)
        ) {
            overlapIndex = z
        }
    })
    if (overlapIndex) {
        activeZone.set(overlapIndex)
    } else {
        activeZone.set(false)
    }
}

// ___ Listen for changes to page visibility (ie. tab being out of focus etc..)
// ___ Fastforward animations when window is refocused
export const deltaJump = writable(0)
let hiddenTime = 0
let hidden, visibilityChange

const handleVisibilityChange = () => {
    if (document[hidden]) {
        hiddenTime = Date.now()
    } else {
        // Number of frames missed (1000ms / 60frames ≈ 16.6666)
        deltaJump.set(Math.round((Date.now() - hiddenTime) / 16.6666))
    }
}

export const initializeVisibilityChangeListener = () => {
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden"
        visibilityChange = "visibilitychange"
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden"
        visibilityChange = "msvisibilitychange"
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden"
        visibilityChange = "webkitvisibilitychange"
    }
    document.addEventListener(visibilityChange, handleVisibilityChange, false)
}


