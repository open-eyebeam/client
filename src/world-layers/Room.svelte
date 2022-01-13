<script>
  // # # # # # # # # # # # # #
  //
  //  Room
  //
  // # # # # # # # # # # # # #

  import Grid from "./Grid.svelte"
  import { GRID_SIZE } from "../data.js"
  import { showGrid } from "../stores.js"

  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  const move = e => {
    if (e.target.id === "room") {
      dispatch("move", {
        x: e.offsetX - 15,
        y: e.offsetY - 15,
      })
    }
  }

  //   *** PROPS
  export let room = {}
  export let x = 0
  export let y = 0

  $: {
    centerViewOnPlayer(x, y)
  }

  let roomElement = {}

  let inlineStyles = ""
  $: inlineStyles = `${room.inlineStyles} transform: translateX(-50%) translateY(-50%);`

  const centerViewOnPlayer = (x, y) => {
    inlineStyles = `${room.inlineStyles} transform: translateX(-${
      x * GRID_SIZE
    }px) translateY(-${y * GRID_SIZE}px);`
  }
</script>

<!-- on:click={e => {
  move(e)
}} -->

<div class="room" id="room" bind:this={roomElement} style={inlineStyles}>
  {#if $showGrid}
    <Grid />
  {/if}
  <slot />
</div>

<div class="center-view" on:click={centerViewOnPlayer}>CENTER VIEW (DEBUG)</div>

<style lang="scss">
  @import "../variables.scss";
  .room {
    position: absolute;
    top: 50%;
    left: 50%;
    background: $e-ink-medium;
    // transition: transform 0.3s ease-out;
  }

  .center-view {
    position: fixed;
    top: 100px;
    left: 20px;
    padding: 5px;
    background: $e-ink-light;
    cursor: pointer;
    font-size: $font-size-small;
    display: none;

    &:hover {
      background: $e-ink-dark;
      color: $e-ink-light;
    }
  }
</style>
