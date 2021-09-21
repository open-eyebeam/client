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
  export let captions = []
</script>

<div class="caption-container">
  {#each captions as caption (caption.text)}
    {#if caption.type === "introduction"}
      <div class="caption-box" transition:fade={transitionSettings}>
        {caption.text}
      </div>
    {/if}
    {#if caption.type === "room"}
      <RoomDialog
        text={caption.text}
        roomId={caption.roomId}
        on:room={e => {
          console.log(e)
          dispatch("room", { roomId: e.detail.roomId })
        }}
      />
    {/if}
  {/each}
</div>

<style lang="scss">
  @import "./variables.scss";

  .caption-box {
    padding: 15px;
    background: #e8eae6;
    color: $COLOR_DARK;
    border: 1px solid $COLOR_DARK;
    z-index: 1000;
  }

  .caption-container {
    position: fixed;
    bottom: 50px;
    left: 30px;
    z-index: 1000;
  }
</style>
