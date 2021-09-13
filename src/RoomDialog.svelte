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
    >
      yes
    </div>
    <div class="choice">no</div>
  </div>
</div>

<style lang="scss">
  @import "./variables.scss";

  .room-dialog-box {
    position: fixed;
    bottom: 30px;
    left: 30px;
    padding: 15px;
    background: #e8eae6;
    color: rgb(30, 30, 30);
    border: 1px solid rgb(30, 30, 30);
    z-index: 1000;
    user-select: none;
  }

  .choice {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
</style>
