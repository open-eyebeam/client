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
      class:is-mobile={$isPhone}
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
      class:is-mobile={$isPhone}
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
      font-size:22px;
      left: 5px;
      width: calc(100% - 10px);
    }
    
  }

  .choice {
    display: flex;
    cursor: pointer;
    border:1px solid $e-ink-dark;
    margin-bottom: 4px;
    &.is-mobile {
      width:50%;
    }

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
