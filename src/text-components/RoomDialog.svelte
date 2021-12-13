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

<div class="room-dialog-box" transition:fade>
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
    <div class="choice" tabindex="0">
      <div class="marker">▸</div>
      No
    </div>
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .room-dialog-box {
    position: fixed;
    bottom: 30px;
    left: 30px;
    padding: 15px;
    background: #e8eae6;
    color: $COLOR_DARK;
    border: 1px solid $COLOR_DARK;
    z-index: 1000;
    user-select: none;
  }

  .choice {
    display: flex;
    cursor: pointer;

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
