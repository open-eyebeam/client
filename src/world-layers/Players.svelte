<script>
  // # # # # # # # # # # # # #
  //
  //  Players
  //
  // # # # # # # # # # # # # #
  import Avatar from "./avatars/Avatar.svelte"

  //   *** PROPS
  export let players = {}
  export let currentRoomId = ""
  export let avatars = []
</script>

{#each Object.entries(players) as [key, player] (key)}
  {#if player.room === currentRoomId && !player.inTransit}
    <Avatar {player} {key} {avatars} />
  {/if}
{/each}
