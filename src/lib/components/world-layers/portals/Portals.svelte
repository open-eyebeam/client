<script>
  // # # # # # # # # # # # # #
  //
  //  Portals
  //
  // # # # # # # # # # # # # #
  import Portal from "./Portal.svelte"
  import { focusPlayer } from "$lib/modules/ui.js"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  //   *** PROPS
  export let portals = {}
</script>

{#if !$focusPlayer}
  {#each portals as portal (portal._id)}
<div role="group">
  <Portal {portal} on:room={e => {
    if (e.detail.roomId) {
      dispatch("room", {roomId: e.detail.roomId})
    }
  }}/>
</div>
  {/each}
{/if}
