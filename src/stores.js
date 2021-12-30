import { writable } from "svelte/store"

export const showGrid = writable(false)
export const showLabels = writable(true)
export const playSound = writable(false)
export const activeArticle = writable(false)
