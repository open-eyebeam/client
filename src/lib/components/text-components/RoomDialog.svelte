<script>
  // # # # # # # # # # # # # #
  //
  //  RoomDialog
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  // *** PROPS
  export let text = ""
  export let roomId = ""
</script>

<div class="room-dialog-box">
  <div>{text}</div>
  <div class="multiple-choice">
    <div
      class="choice"
      on:click={e => {
        dispatch("room", { roomId: roomId })
      }}
      tabindex="0"
      autofocus
      on:keydown={e => {
        if (e.code === "Enter") {
          dispatch("room", { roomId: roomId })
        }
      }}
    >
      <div class="marker">▸</div>
      Yes
    </div>
    <div
      class="choice"
      on:click={e => {
        dispatch("room", { roomId: false })
      }}
      on:keydown={e => {
        if (e.code === "Enter") {
          dispatch("room", { roomId: false })
        }
      }}
      tabindex="0"
    >
      <div class="marker">▸</div>
      No
    </div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .room-dialog-box {
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 15px;
    background: #e8eae6;
    color: $e-ink-dark;
    border: 1px solid $e-ink-dark;
    z-index: 1000;
    user-select: none;

    @include screen-size("small") {
      bottom: unset;
      top: 40px;
      left: 5px;
      max-width: calc(100% - 10px);
    }
  }

  .choice {
    display: flex;
    cursor: pointer;
    outline-color: $e-ink-dark;
    outline-width: 1px;

    .marker {
      opacity: 0;
      width: 1em;
      text-align: center;
    }

    &:hover,
    &:focus {
      .marker {
        opacity: 1;
      }
    }
  }
</style>
