<script>
  // # # # # # # # # # # # # #
  //
  //  Portals
  //
  // # # # # # # # # # # # # #
  import Portal from "./Portal.svelte"

  //   *** PROPS
  export let portals = {}
</script>

{#each portals as portal (portal._id)}
  <Portal {portal} />
{/each}
