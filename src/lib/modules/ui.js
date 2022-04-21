import { writable, get } from "svelte/store"

export const showGrid = writable(false)
export const showLabels = writable(true)
export const playSound = writable(false)
export const activeArticle = writable(false)
export const activeCity = writable({})
export const trayOpen = writable(false)
export const currentRoom = writable(false)
export const PRODUCTION = writable(false)

export const infoLogger = (...args) => {
    if (!get(PRODUCTION)) {
        console.info(...args)
    }
}

export const errorLogger = (...args) => {
    console.error(...args)
}

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