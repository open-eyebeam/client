<script>
  // # # # # # # # # # # # # #
  //
  //  OBJECT DIALOG
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import { isPhone } from "$lib/modules/ui.js" 

  const dispatch = createEventDispatcher()

  // *** PROPS
  export let text = ""
  export let objectId = ""
</script>

<div class="object-dialog-box" class:is-mobile={$isPhone} aria-live="polite">
  <div>{text}</div>
  <div class="multiple-choice">
    <div
      class="choice"
      on:click={e => {
        dispatch("object", { objectId: objectId })
      }}
      tabindex="0"
      autofocus
      on:keydown={e => {
        if (e.code === "Enter") {
          dispatch("object", { objectId: objectId })
        }
      }}
    >
      <div class="marker">▸</div>
      Yes
    </div>
    <div
      class="choice"
      on:click={e => {
        dispatch("object", { objectId: false })
      }}
      on:keydown={e => {
        if (e.code === "Enter") {
          dispatch("object", { objectId: false })
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

  .object-dialog-box {
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 15px;
    background: #e8eae6;
    color: $e-ink-dark;
    border: 1px solid $e-ink-dark;
    z-index: 1000;
    user-select: none;
    &.is-mobile {
      bottom: 180px;
      width: calc(100% - 10px);
      font-size: 22px;
    }

    @include screen-size("small") {

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
