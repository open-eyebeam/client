import { writable } from "svelte/store"

// ___ Listen for changes to page visibility (ie. tab being out of focus etc..)
// ___ Fastforward animations when window is refocused
export const deltaJump = writable(0)
let hiddenTime = 0
let hidden, visibilityChange

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

const handleVisibilityChange = () => {
  if (document[hidden]) {
    hiddenTime = Date.now()
  } else {
    // Number of frames missed (1000ms / 60frames ≈ 16.6666)
    deltaJump.set(Math.round((Date.now() - hiddenTime) / 16.6666))
  }
}

document.addEventListener(visibilityChange, handleVisibilityChange, false)