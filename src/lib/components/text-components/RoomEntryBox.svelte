<script>
  // # # # # # # # # # # # # #
  //
  //  ROOM ENTRY BOX
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

<div class="caption-container" in:fade aria-live="polite">
  <RoomDialog
    text={`Go to ${roomTitle}?`}
    roomId={roomIntent}
    on:room={e => {
      dispatch("room", { roomId: e.detail.roomId })
    }}
  />
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .caption-box {
    padding: 15px;
    background: $e-ink-light;
    color: $e-ink-dark;
    border: $border-style;
    z-index: 1000;
    font-size: $font-size-small;
  }

  .caption-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
  }
</style>
