<script>
  // # # # # # # # # # # # # #
  //
  //  Avatar
  //
  // # # # # # # # # # # # # #
  import { fly, scale, fade } from "svelte/transition"
  import { onMount, onDestroy } from "svelte"

  //   *** PROPS
  export let player = {}
  export let key = ""

  let avatarEl = {}

  onMount(async () => {
    if (!player.self) {
      tippy(avatarEl, {
        content: player.name,
        arrow: false,
        offset: [0, 5],
        //   showOnCreate: true,
        sticky: true,
        //   hideOnClick: false,
      })
    }
  })
</script>

<div
  transition:scale
  class="avatar"
  class:self={player.self}
  bind:this={avatarEl}
  id={key}
  alt={player.name}
  style={"transform: translateY(" +
    player.y +
    "px) translateX(" +
    player.x +
    "px)"}
/>

<!-- style={"top: " + player.y + "px; left: " + player.x + "px;"} -->
<style lang="scss">
  @import "./variables.scss";

  .avatar {
    height: 20px;
    width: 20px;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.2s linear;
    border: 1px solid rgba(33, 33, 33, 1);

    &:hover {
      background: rgba(220, 220, 220, 1);
    }

    &.self {
      background: rgba(33, 33, 33, 1);

      &:hover {
        background: rgba(33, 33, 33, 1);
      }
    }
  }
</style>
