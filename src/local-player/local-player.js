import { writable } from "svelte/store"

export const localPlayer = writable({
  uuid: '',
  sessionId: '',
  name: '',
  profile: {}
})


