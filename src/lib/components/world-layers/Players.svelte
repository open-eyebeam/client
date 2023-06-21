<script>
  // # # # # # # # # # # # # #
  //
  //  Players
  //
  // # # # # # # # # # # # # #
  import Avatar from "$lib/components/world-layers/avatars/Avatar.svelte"

  //   *** PROPS
  export let players = {}
  export let currentRoomId = ""
  export let avatars = []
  export let streamRect = {}
</script>

<div role="group">
{#each Object.entries(players) as [key, player] (key)}
  {#if player.room === currentRoomId && !player.inTransit}
    <Avatar {player} {key} {avatars} {streamRect}/>
  {/if}
{/each}
</div>
