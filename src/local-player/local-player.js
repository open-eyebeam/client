import { writable } from "svelte/store"

// WRITABLE
// export const localUserUUID = writable("")
// export const localUserSessionID = writable("")
// export const localUserName = writable(false)
// export const profile = writable({})
// export const profileMeta = writable({})
// export const currentArea = writable('field') 

export const localPlayer = writable({
  uuid: '',
  sessionId: '',
  name: '',
  profile: {}
})


