<script>
  // # # # # # # # # # # # # #
  //
  //  Zones
  //
  // # # # # # # # # # # # # #
  import Zone from "./Zone.svelte"
  import { focusPlayer } from "$lib/modules/ui.js"

  //   *** PROPS
  export let zones = {}
</script>

{#if !$focusPlayer}
  {#each zones as zone (zone._id)}
    <Zone {zone} />
  {/each}
{/if}
