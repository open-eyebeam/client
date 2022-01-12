<script>
  // # # # # # # # # # # # # #
  //
  //  CAPTION BOX
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { renderBlockText } from "../sanity.js"
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  const transitionSettings = { duration: 500 }

  // *** PROPS
  export let text = []

  let textIndex = 0
  let currentText = false

  if (text.length > 0) {
    currentText = text[textIndex]
  }
</script>

<div class="caption-container">
  <div
    class="caption-box"
    on:click={e => {
      if (textIndex < text.length - 1) {
        textIndex++
        currentText = text[textIndex]
      } else {
        dispatch("close")
      }
    }}
    in:fade={transitionSettings}
    out:fade={{ duration: 100 }}
  >
    {@html renderBlockText(currentText.text.content)}
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .caption-box {
    padding: 15px;
    background: $e-ink-light;
    color: $e-ink-dark;
    border: 1px solid $e-ink-dark;
    z-index: 1000;
    font-size: $font-size-small;
    padding-bottom: 0;
    cursor: pointer;
  }

  .caption-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 100000;
    max-width: 460px;
  }
</style>
