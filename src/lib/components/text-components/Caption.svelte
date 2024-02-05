<script>
  // # # # # # # # # # # # # #
  //
  //  CAPTION BOX
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import { renderBlockText } from "$lib/modules/sanity.js"

  import { isPhone } from "$lib/modules/ui.js" 
  // *** GRAPHICS
  import TriangleDown from "$lib/components/graphics/triangle-down.svelte"
  const dispatch = createEventDispatcher()
  const transitionSettings = { duration: 500 }

  // *** PROPS
  export let text = []

  let textIndex = 0
  let currentText = false

  $: if (text.length > 0) {
    currentText = text[textIndex]
  }
</script>

<div class="caption-container" class:is-mobile={$isPhone}>
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
    aria-live="polite"
    in:fade={transitionSettings}
    out:fade={{ duration: 100 }}
  >
    {@html renderBlockText(currentText.text.content)}
  </div>
  {#if textIndex < text.length - 1}
    <div
      class="next-caption"
      on:click={e => {
        textIndex++
        currentText = text[textIndex]
      }}
    >
      <TriangleDown />
    </div>
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .caption-container {
    position: fixed;
    bottom: 20px;
    left: 20%;
    z-index: 10000;
    max-width: 40%;
    display: flex;

    &.is-mobile {
      bottom: 100px;
      left: 5px;
      max-width: calc(100% - 10px);
    }
  }

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

  .next-caption {
    padding-left: 15px;
    padding-right: 15px;
    background: $e-ink-medium;
    color: $e-ink-dark;
    border: 1px solid $e-ink-dark;
    z-index: 1000;
    font-size: $font-size-small;
    padding-bottom: 0;
    cursor: pointer;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
