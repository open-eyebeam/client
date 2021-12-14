<script>
  // # # # # # # # # # # # # #
  //
  //  CAPTION BOX
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import RoomDialog from "./RoomDialog.svelte"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  const transitionSettings = { duration: 500 }

  // *** PROPS
  export let roomIntent = ""
  export let roomTitle = ""
</script>

<div class="caption-container" in:fade>
  <RoomDialog
    text={`Go to ${roomTitle}?`}
    roomId={roomIntent}
    on:room={e => {
      console.log(e)
      dispatch("room", { roomId: e.detail.roomId })
    }}
  />
</div>

<style lang="scss">
  @import "../variables.scss";

  .caption-box {
    padding: 15px;
    background: $white;
    color: $black;
    border: $border-style;
    z-index: 1000;
  }

  .caption-container {
    position: fixed;
    bottom: 50px;
    left: 30px;
    z-index: 1000;
  }
</style>
