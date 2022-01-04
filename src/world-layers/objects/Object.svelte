<script>
  // # # # # # # # # # # # # #
  //
  //  Object
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { onMount } from "svelte"
  import { urlFor } from "../../sanity.js"
  import { get } from "lodash"
  import { showLabels, activeArticle } from "../../stores.js"
  import { GRID_SIZE } from "../../data.js"

  //   *** PROPS
  export let object = {}

  // *** VARIABLES
  let objectEl = {}
  let label = {}
  let gridPosY = object.y * GRID_SIZE
  let gridPosX = object.x * GRID_SIZE
  let gridWidth = get(object, "dimensions.width", 1) * GRID_SIZE
  let gridHeight = get(object, "dimensions.height", 1) * GRID_SIZE

  $: {
    if (label.popper) {
      if ($showLabels) {
        label.show()
      } else {
        label.hide()
      }
    }
  }

  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${gridWidth}px; height: ${gridHeight}px;`

  onMount(async () => {
    label = tippy(objectEl, {
      content: object.title,
      arrow: false,
      offset: [0, 5],
      theme: object.static ? "static" : "name",
      hideOnClick: false,
      sticky: true,
      trigger: "manual",
      flip: false,
      placement: "bottom",
    })
  })
</script>

<div
  transition:fade
  class="object"
  class:static={object.static}
  bind:this={objectEl}
  class:image={object.iconImage}
  id={object._id}
  alt={object.title}
  style={inlineStyles}
  on:click={() => {
    activeArticle.set(object)
  }}
>
  {#if object.iconImage}
    <img src={urlFor(object.iconImage).quality(100).height(300).url()} />
  {/if}
</div>

<style lang="scss">
  @import "../../variables.scss";

  .object {
    height: 32px;
    width: 32px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: opacity 0.5s $transition;
    background: $e-ink-medium;

    &:hover {
      opacity: 0.8;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      image-rendering: pixelated;
    }

    &.static {
      pointer-events: none;
      cursor: default;
    }
  }
</style>
