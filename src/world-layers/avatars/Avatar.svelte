<script>
  // # # # # # # # # # # # # #
  //
  //  Avatar
  //
  // # # # # # # # # # # # # #
  import { fly, scale, fade } from "svelte/transition"
  import { onMount, onDestroy } from "svelte"

  // *** GRAPHICS
  import Square from "./square.svelte"
  import Star from "./star.svelte"
  import Triangle from "./triangle.svelte"
  import Pentagon from "./pentagon.svelte"
  import Hexagon from "./hexagon.svelte"

  //   *** PROPS
  export let player = {}
  export let key = ""

  let avatarEl = {}

  // console.log("player", player)

  onMount(async () => {
    // console.log("player", player)
    // console.log("player.name", player.name)
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
>
  {#if player.shape === "square"}
    <Square self={player.self} />
  {/if}
  {#if player.shape === "triangle"}
    <Triangle self={player.self} />
  {/if}
  {#if player.shape === "hexagon"}
    <Hexagon self={player.self} />
  {/if}
  {#if player.shape === "pentagon"}
    <Pentagon self={player.self} />
  {/if}
  {#if player.shape === "star"}
    <Star self={player.self} />
  {/if}
</div>

<style lang="scss">
  @import "../../variables.scss";

  .avatar {
    height: 30px;
    width: 30px;
    position: absolute;
    top: 0;
    left: 0;
    // transition: transform 0.2s linear;
  }
</style>
