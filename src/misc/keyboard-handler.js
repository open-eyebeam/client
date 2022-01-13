import { writable, get } from "svelte/store"

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
        document.addEventListener("keydown", key => {
            if (get(keyReleased)) {
                // W Key is 87 & Up arrow is 87
                if (key.keyCode === 38) {
                    pressedKeys["UP"] = true
                    keyReleased.set(false)
                }
                // S Key is 83 & Down arrow is 40
                if (key.keyCode === 40) {
                    pressedKeys["DOWN"] = true
                    keyReleased.set(false)
                }
                // A Key is 65 & Left arrow is 37
                if (key.keyCode === 37) {
                    pressedKeys["LEFT"] = true
                    keyReleased.set(false)
                }
                // D Key is 68 & Right arrow is 39
                if (key.keyCode === 39) {
                    pressedKeys["RIGHT"] = true
                    keyReleased.set(false)
                }
            }
        })
        // PLAYER => KEY UP
        document.addEventListener("keyup", key => {
            // console.log('keyup')
            keyReleased.set(true)
        })
        resolve()
    })
}