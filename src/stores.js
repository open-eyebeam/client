import { writable } from "svelte/store"

export const showGrid = writable(false)
export const showLabels = writable(true)
export const playSound = writable(true)
export const activeArticle = writable(false)
export const activeCity = writable({})
export const trayOpen = writable(false)
export const currentRoom = writable(false)