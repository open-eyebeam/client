<script>
  // # # # # # # # # # # # # #
  //
  //  Zone
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { onMount } from "svelte"
  import { urlFor } from "../../sanity.js"
  import { get } from "lodash"
  import { showLabels } from "../../stores.js"
  import { GRID_SIZE } from "../../data.js"

  //   *** PROPS
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
    label = tippy(zoneEl, {
      content: zone.title,
      arrow: false,
      offset: [0, 5],
      theme: "name",
      hideOnClick: false,
      sticky: true,
      trigger: "manual",
      flip: false,
      placement: "bottom",
      popperOptions: {
        modifiers: [
          {
            name: "flip",
            enabled: false,
          },
          {
            name: "preventOverflow",
            enabled: false,
          },
        ],
      },
    })
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
  {#if zone.backgroundImage}
    <img src={urlFor(zone.backgroundImage).quality(100).url()} />
  {/if}
</div>

<style lang="scss">
  @import "../../variables.scss";

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

    &.image {
      border-radius: 0;
      background: unset;
      height: 80px;
      width: auto;
      border: 1px solid transparent;

      img {
        max-height: 100%;
        image-rendering: pixelated;
      }

      &:hover {
        border: 1px solid $e-ink-dark;
      }
    }
  }
</style>
