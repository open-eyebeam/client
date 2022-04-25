<script>
  // # # # # # # # # # # # # #
  //
  //  Zone
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { onMount } from "svelte"
  import get from "lodash/get.js"
  import { urlFor } from "$lib/modules/sanity.js"
  import { showLabels, toolTipConfig } from "$lib/modules/ui.js"
  import { GRID_SIZE } from "$lib/modules/world.js"

  // *** PROPS
  export let zone = {}

  // *** VARIABLES
  let zoneEl = {}
  let label = {}
  let gridPosY = zone.y * GRID_SIZE
  let gridPosX = zone.x * GRID_SIZE
  let gridWidth = get(zone, "dimensions.width", 1) * GRID_SIZE
  let gridHeight = get(zone, "dimensions.height", 1) * GRID_SIZE

  $: {
    if (label.popper) {
      if ($showLabels) {
        label.show()
      } else {
        label.hide()
      }
    }
  }

  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${gridWidth}px; height: ${gridHeight}px;};`

  onMount(async () => {
    const config = toolTipConfig
    config.content = zone.title
    config.appendTo = zoneEl.parentElement
    config.theme = "name"
    label = tippy(zoneEl, config)
  })
</script>

<div
  transition:fade
  class="zone"
  bind:this={zoneEl}
  id={zone._id}
  alt={zone.title}
  style={inlineStyles}
>
  {#if zone.bgVideoUrl}
    <video src={zone.bgVideoUrl} autoplay loop muted />
  {:else if zone.backgroundImage}
    <img src={urlFor(zone.backgroundImage).quality(100).url()} />
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .zone {
    height: 32px;
    width: 32px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: opacity 0.5s $transition;
    pointer-events: none;

    &:hover {
      background: transparent;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      max-height: 100%;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
