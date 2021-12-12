// ___ Set overarching state of the UI
export const STATE = {
    ERROR: 0,
    READY: 1,
    LOADING: 2,
    DISCONNECTED: 3,
    ONBOARDING: 4,
}

export const UI = { state: STATE.READY, errorMessage: false }

export const setUIState = (newState, errorMessage = false) => {
    // console.log("NEW STATE", newState)
    switch (newState) {
        case STATE.READY:
            UI.state = STATE.READY
            break
        case STATE.LOADING:
            UI.state = STATE.LOADING
            break
        case STATE.DISCONNECTED:
            UI.state = STATE.DISCONNECTED
            break
        case STATE.ONBOARDING:
            UI.state = STATE.ONBOARDING
            break
        default:
            UI.state = STATE.ERROR
            UI.errorMessage = errorMessage
    }
}