<script>
  // # # # # # # # # # # # # #
  //
  //  Room
  //
  // # # # # # # # # # # # # #

  import Grid from "./Grid.svelte"

  import { showGrid, showLabels, playSound } from "../stores.js"

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
  // $: console.log("x", x)
  // $: console.log("y", y)

  let roomElement = {}

  let inlineStyles = ""
  $: inlineStyles = `${room.inlineStyles} transform: translateX(-50%) translateY(-50%);`

  const centerViewOnPlayer = () => {
    inlineStyles = `${room.inlineStyles} transform: translateX(-${x}px) translateY(-${y}px);`
  }
</script>

<div
  class="room"
  id="room"
  bind:this={roomElement}
  style={inlineStyles}
  on:click={e => {
    move(e)
  }}
>
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
    background: $grey;
    background: red;
    cursor: crosshair;
    transition: transform 0.3s ease-out;
  }

  .center-view {
    position: fixed;
    top: 100px;
    left: 20px;
    padding: 5px;
    background: $white;
    cursor: pointer;
    font-size: $font-size-small;
    display: none;

    &:hover {
      background: $black;
      color: $white;
    }
  }
</style>
