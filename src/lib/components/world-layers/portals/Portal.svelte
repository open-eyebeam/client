<script>
  // # # # # # # # # # # # # #
  //
  //  Portal
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { onMount } from "svelte"
  import get from "lodash/get.js"
  import { urlFor } from "$lib/modules/sanity.js"
  import { showLabels, toolTipConfig } from "$lib/modules/ui.js"
  import { GRID_SIZE } from "$lib/modules/world.js"

  // *** PROPS
  export let portal = {}

  // *** VARIABLES
  let portalEl = {}
  let label = {}
  let gridPosY = portal.y * GRID_SIZE
  let gridPosX = portal.x * GRID_SIZE

  $: {
    if (label.popper) {
      if ($showLabels) {
        label.show()
      } else {
        label.hide()
      }
    }
  }

  const inlineStyles = `transform: translateY(${gridPosY}px) translateX(${gridPosX}px); width: ${GRID_SIZE}px; height: ${GRID_SIZE}px; background-color: ${get(
    portal,
    "backgroundColor.hex",
    ""
  )}; background-image: url("${get(portal, "bgImageUrl", "")}");"`

  onMount(async () => {
    const config = toolTipConfig
    config.content = "door to " + get(portal, "targetArea.title", "")
    config.appendTo = portalEl.parentElement
    label = tippy(portalEl, config)
  })
//ACCESSIBILITY
  import { currentRoom } from "$lib/modules/movement.js"
  import { worldObject } from "$lib/modules/world.js"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

</script>

<div
  transition:fade
  class="portal"
  bind:this={portalEl}
  id={portal._id}
  alt={portal.title}
  style={inlineStyles}
  tabindex=0
  aria-label={"Go to " + portal.title}
  on:keydown={e => {
    console.log('e: ', e)
    if (e.key === "Enter") {
      dispatch("room", { roomId: portal.targetArea._id })
    }
  }}

>
  {#if portal.iconImage}
    <img src={urlFor(portal.iconImage).quality(100).height(100).url()} />
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .portal {
    height: 32px;
    width: 32px;
    // border-radius: 50%;
    // border: 1px solid $e-ink-dark;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
    transition: opacity 0.5s $transition;
    pointer-events: none;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: $e-ink-medium;
  }
</style>
