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
  export let currentRoomId = ""
</script>

{#each Object.entries(players) as [key, player] (key)}
  {#if player.room === currentRoomId}
    <Avatar {player} {key} />
  {/if}
{/each}
