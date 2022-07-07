<script>
  // # # # # # # # # # # # # #
  //
  //  Objects
  //
  // # # # # # # # # # # # # #
  import Object from "./Object.svelte"
  import { focusPlayer } from "$lib/modules/ui.js"

  //   *** PROPS
  export let objects = {}
</script>

{#if !$focusPlayer}
<div role="group">
  {#each objects as object (object._id)}
    <Object {object} />
  {/each}
</div>
{/if}
