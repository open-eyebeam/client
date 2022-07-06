<script>
  // # # # # # # # # # # # # #
  //
  //  Person link list
  //
  // # # # # # # # # # # # # #

  // *** COMPONENTS
  import PersonLink from "$lib/components/person-link.svelte"

  // *** PROPS
  export let people = []
</script>

{#each people as person, index}
  <PersonLink {person} />{#if index == people.length - 2}&{/if}
{/each}

<style lang="scss">
  @import "src/lib/style/variables.scss";
</style>
