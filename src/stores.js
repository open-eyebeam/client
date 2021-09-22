import { writable, derived } from "svelte/store"
import get from "lodash/get"

  // *** GLOBAL
  import {
    HEX_MAP,
  } from "./global.js"

// WRITABLE
export const profile = writable({})
export const profileMeta = writable({})
export const localUserUUID = writable("")
export const localUserSessionID = writable("")
export const localUserName = writable(false)
export const globalUserList = writable([])
export const globalSettings = writable({})
export const areaList = writable({})
export const currentArea = writable('field')
export const maxDimension = derived(
    [currentArea],
    ([$currentArea]) => {
        // console.log('$currentArea', $currentArea)
        if($currentArea === 'field') {
            return 2000
        } else {
            return 500
        }
    }
  )

