<script>
  // # # # # # # # # # # # # #
  //
  //  Objects
  //
  // # # # # # # # # # # # # #
  import Object from "./Object.svelte"

  //   *** PROPS
  export let objects = {}
</script>

{#each objects as object (object._id)}
  <Object {object} />
{/each}
