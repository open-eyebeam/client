<script>
  // # # # # # # # # # # # # #
  //
  //  Zones
  //
  // # # # # # # # # # # # # #
  import Zone from "./Zone.svelte"

  //   *** PROPS
  export let zones = {}
</script>

{#each zones as zone (zone._id)}
  <Zone {zone} />
{/each}
