<script>
  // # # # # # # # # # # # # #
  //
  //  Portals
  //
  // # # # # # # # # # # # # #
  import Portal from "./Portal.svelte"
  import { focusPlayer } from "$lib/modules/ui.js"

  //   *** PROPS
  export let portals = {}
</script>

{#if !$focusPlayer}
  {#each portals as portal (portal._id)}
    <Portal {portal} />
  {/each}
{/if}
