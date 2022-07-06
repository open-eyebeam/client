// * * * * * * * * * * * * * * * * * * * * * * * * * * *
//
//  movement.js =>
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * *

import { writable, get } from "svelte/store"
import inRange from "lodash/inRange.js"
import _ from 'lodash'
import throttle from 'lodash/throttle.js'
import { players, moveTo } from "$lib/modules/engine.js"
import { GRID_SIZE, localPlayer } from "$lib/modules/world.js"

// *** VARIABLES
export const roomIntent = writable(false)
export const objectIntent = writable(false)
export const activeZone = writable(false)
export const currentRoom = writable(false)
export const centeringInlineStyles = writable("transform: translateX(-50%) translateY(-50%);")

export const initializeKeyboardHandler = () => {
    return new Promise((resolve, reject) => {
        // Repeated keydown events are throttled to once every 100ms
        document.addEventListener("keydown", throttle(key => {
            // W Key is 87 & Up arrow is 87
            if (key.keyCode === 38) {
                if (get(players)[get(localPlayer).uuid].y > 0) {
                    players.update(ps => {
                        ps[get(localPlayer).uuid].y -= 1
                        return ps
                    })
                }

            }
            // S Key is 83 & Down arrow is 40
            if (key.keyCode === 40) {
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
                if (get(players)[get(localPlayer).uuid].x > 0) {
                    players.update(ps => {
                        ps[get(localPlayer).uuid].x -= 1
                        return ps
                    })
                }
            }
            // D Key is 68 & Right arrow is 39
            if (key.keyCode === 39) {
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
        }, 100))
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
        get(currentRoom).objects.filter(o => !o.static).forEach(o => {
            if (
                inRange(get(players)[get(localPlayer).uuid].x, o.x, o.x + _.get(o, 'dimensions.width', 0)) &&
                inRange(get(players)[get(localPlayer).uuid].y, o.y, o.y + _.get(o, 'dimensions.height', 0))
            ) {
                overlapIndex = o._id
            }
        })
        if (overlapIndex) {
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
