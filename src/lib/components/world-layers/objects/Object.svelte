<script>
  // # # # # # # # # # # # # #
  //
  //  Object
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { onMount } from "svelte"
  import { urlFor } from "$lib/modules/sanity.js"
  import get from "lodash/get.js"
  import { showLabels, toolTipConfig } from "$lib/modules/ui.js"
  import { GRID_SIZE } from "$lib/modules/world.js"
  

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
    const config = toolTipConfig
    config.content = object.title
    config.appendTo = objectEl.parentElement
    config.theme = object.static ? "static" : "name"
    label = tippy(objectEl, config)
  })
//ACCESSIBILITY
  import { currentRoom, objectIntent } from "$lib/modules/movement.js"
  import { createEventDispatcher } from "svelte"
  import { activeArticle } from "$lib/modules/ui.js"
  const dispatch = createEventDispatcher()

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
    // activeArticle.set(object)
  }}
  tabindex=0
  aria-label={object.static ? "Inspect " + object.title : 'A static image of a ' + object.title}
  on:keydown={e => {
    console.log('e: ', e)
    if (e.key === "Enter" && !object.static) {
      dispatch("object", { objectId: object._id })
     activeArticle.set(
          $currentRoom.objects.find(o => o._id == object._id)
        )
    }
  }}
>
  {#if object.iconImage}
    <img src={urlFor(object.iconImage).quality(100).height(300).url()} alt={object.title} / >
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .object {
    height: 32px;
    width: 32px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background: $e-ink-medium;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    &.static {
      pointer-events: none;
      cursor: default;
    }
  }
</style>
