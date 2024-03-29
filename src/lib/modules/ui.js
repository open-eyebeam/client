// * * * * * * * * * * * * * * * * * * * * * * * * * * *
//
//  ui.js =>
//  User interface functions
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * *

import { writable } from "svelte/store"

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
export const activeFeed = writable(false)
export const trayOpen = writable(false)
export const focusPlayer = writable(true)
export const uiState = writable(STATE.LOADING)
export const isPhone = writable(false)
export const VIDEO_LIBRARY_SLUG = "videoLibrary";
export const activeMouse = writable(true);
export const activeVideoLibrary = writable(false);
export const urlHash = writable("");

export const toolTipConfig = {
    content: "",
    arrow: false,
    offset: [0, 5],
    theme: "name",
    hideOnClick: false,
    sticky: true,
    trigger: "manual",
    flip: false,
    placement: "bottom",
    appendTo: {},
    zIndex: 10,
    popperOptions: {
        strategy: "fixed",
        modifiers: [
            {
                name: "flip",
                enabled: false,
            },
            {
                name: "preventOverflow",
                enabled: false,
            },
        ],
    },
}

export const transitionWorldOut = el => {
    return new Promise((resolve, reject) => {
        let tl = gsap.timeline()
        tl.to(el, 0.5, {
            css: { opacity: 0 },
        })
        tl.play()
        tl.eventCallback("onComplete", () => {
            resolve()
        })
    })
}

export const transitionWorldIn = el => {
    return new Promise((resolve, reject) => {
        let tl = gsap.timeline()
        tl.to(el, 0.5, {
            css: { opacity: 0 },
        })
        tl.to(el, 0.5, {
            css: { opacity: 1 },
        })
        tl.play()
        tl.eventCallback("onComplete", () => {
            resolve()
        })
    })
}
