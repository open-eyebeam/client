<script>
  // # # # # # # # # # # # # #
  //
  //  Room
  //
  // # # # # # # # # # # # # #

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
  // $: console.log("room", room)
</script>

<div
  class="room"
  id="room"
  style={room.inlineStyles}
  on:click={e => {
    move(e)
  }}
>
  <slot />
</div>

<style lang="scss">
  @import "../variables.scss";
  .room {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(205, 205, 205, 1);
    cursor: crosshair;
    background-size: 100px;
  }
</style>
