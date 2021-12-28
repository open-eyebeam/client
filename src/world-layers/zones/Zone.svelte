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
  import { toRGBA } from "../../global.js"
  import { GRID_SIZE } from "../../data.js"

  //   *** PROPS
  export let zone = {}

  let gridPosY = zone.y * GRID_SIZE
  let gridPosX = zone.x * GRID_SIZE
  let gridWidth = get(zone, "dimensions.width", 1) * GRID_SIZE
  let gridHeight = get(zone, "dimensions.height", 1) * GRID_SIZE

  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${gridWidth}px; height: ${gridHeight}px; background-color: ${toRGBA(
    zone.backgroundColor
  )};`

  onMount(async () => {
    // tippy(zoneEl, {
    //   content: zone.title,
    //   arrow: false,
    //   offset: [0, 5],
    //   //   showOnCreate: true,
    //   sticky: true,
    //   //   hideOnClick: false,
    // })<
  })
</script>

<div
  transition:fade
  class="zone"
  id={zone._id}
  alt={zone.title}
  style={inlineStyles}
>
  {#if zone.iconImage}
    <img src={urlFor(zone.iconImage).quality(100).height(100).url()} />
  {/if}
</div>

<style lang="scss">
  @import "../../variables.scss";

  .zone {
    height: 32px;
    width: 32px;
    background: $COLOR_DARK;
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
      }

      &:hover {
        border: 1px solid $COLOR_DARK;
      }
    }
  }
</style>
