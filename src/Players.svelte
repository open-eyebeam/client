<script>
  // # # # # # # # # # # # # #
  //
  //  Players
  //
  // # # # # # # # # # # # # #
  import { fly, scale, fade } from "svelte/transition"
  import Avatar from "./Avatar.svelte"

  // *** STORES
  import { currentArea } from "./stores.js"

  //   *** PROPS
  export let players = {}
</script>

{#each Object.entries(players) as [key, player] (key)}
  {#if player.onboarded && player.room === $currentArea}
    <Avatar {player} {key} />
  {/if}
{/each}
