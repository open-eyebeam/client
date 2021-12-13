export const pressedKeys = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false,
}
let releasedKey = false

export const initializeKeyboardHandler = () => {
    return new Promise((resolve, reject) => {
        // PLAYER => KEY DOWN
        document.addEventListener("keydown", key => {
            // if (UI.state == STATE.READY) {
            // W Key is 87 & Up arrow is 87
            if (key.keyCode === 38) {
                pressedKeys["UP"] = true
            }
            // S Key is 83 & Down arrow is 40
            if (key.keyCode === 40) {
                pressedKeys["DOWN"] = true
            }
            // A Key is 65 & Left arrow is 37
            if (key.keyCode === 37) {
                pressedKeys["LEFT"] = true
            }
            // D Key is 68 & Right arrow is 39
            if (key.keyCode === 39) {
                pressedKeys["RIGHT"] = true
            }
            // }
        })
        // PLAYER => KEY UP
        document.addEventListener("keyup", key => {
            // if (UI.state == STATE.READY) {
            // W Key is 87 & Up arrow is 87
            if (key.keyCode === 38) {
                pressedKeys["UP"] = false
            }
            // S Key is 83 & Down arrow is 40
            if (key.keyCode === 40) {
                pressedKeys["DOWN"] = false
            }
            // A Key is 65 & Left arrow is 37
            if (key.keyCode === 37) {
                pressedKeys["LEFT"] = false
            }
            // D Key is 68 & Right arrow is 39
            if (key.keyCode === 39) {
                pressedKeys["RIGHT"] = false
            }
            // }
        })
        resolve()
    })
}