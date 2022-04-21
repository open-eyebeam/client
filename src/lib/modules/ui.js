import { writable, get } from "svelte/store"

export const STATE = {
    ERROR: 0,
    READY: 1,
    LOADING: 2,
    DISCONNECTED: 3,
    ONBOARDING: 4,
}

export const showGrid = writable(false)
export const showLabels = writable(true)
export const playSound = writable(false)
export const activeArticle = writable(false)
export const activeCity = writable({})
export const trayOpen = writable(false)
export const currentRoom = writable(false)
export const PRODUCTION = writable(false)
export const uiState = writable(STATE.LOADING)

export const infoLogger = (...args) => {
    if (!get(PRODUCTION)) {
        console.info(...args)
    }
}

export const errorLogger = (...args) => {
    console.error(...args)
}