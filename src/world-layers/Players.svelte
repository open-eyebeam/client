<script>
  // # # # # # # # # # # # # #
  //
  //  Players
  //
  // # # # # # # # # # # # # #
  import { fly, scale, fade } from "svelte/transition"
  import Avatar from "./avatars/Avatar.svelte"

  //   *** PROPS
  export let players = {}
  // console.log("players", players)
</script>

{#each Object.entries(players) as [key, player] (key)}
  <!-- {#if player.onboarded && player.room === $currentArea} -->
  <Avatar {player} {key} />
  <!-- {/if} -->
{/each}
