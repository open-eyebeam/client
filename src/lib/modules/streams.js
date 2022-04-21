import { writable } from "svelte/store"
import { loadData, client } from "$lib/modules/sanity.js"

export const streams = writable([])

export const initializeStreamsHandler = async () => {
    const STREAMS_QUERY = '*[_id == "streams"][0]'
    let sx = await loadData(STREAMS_QUERY)
    streams.set(sx.activeStreams)
    // __ Listen for changes to the active streams post
    client.listen(STREAMS_QUERY).subscribe(update => {
        streams.set(update.result.activeStreams)
    })
}

