<script>
  // # # # # # # # # # # # # #
  //
  // OBJECT INSPECTION BOX
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import ObjectDialog from "./ObjectDialog.svelte"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  const transitionSettings = { duration: 500 }

  // *** PROPS
  export let objectIntent = ""
  export let objectTitle = ""
</script>

<div class="caption-container" in:fade>
  {objectTitle}
  <ObjectDialog
    text={`Look at ${objectTitle}?`}
    objectId={objectIntent}
    on:object={e => {
      dispatch("object", { objectId: e.detail.objectId })
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
