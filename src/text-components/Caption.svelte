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
</script>

<div class="caption-container">
  <div
    class="caption-box"
    on:click={e => {
      dispatch("close")
    }}
    in:fade={transitionSettings}
    out:fade={{ duration: 100 }}
  >
    {@html renderBlockText(text)}
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .caption-box {
    padding: 15px;
    background: $COLOR_LIGHT;
    color: $COLOR_DARK;
    border: 1px solid $COLOR_DARK;
    z-index: 1000;
    font-size: $font-size-small;
    padding-bottom: 0;
    cursor: pointer;
  }

  .caption-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
    max-width: 460px;
  }
</style>
