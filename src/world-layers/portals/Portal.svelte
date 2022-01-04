<script>
  // # # # # # # # # # # # # #
  //
  //  Portal
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { onMount } from "svelte"
  import { urlFor } from "../../sanity.js"
  import { get } from "lodash"
  import { showLabels } from "../../stores.js"
  import { GRID_SIZE } from "../../data.js"

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
    label = tippy(portalEl, {
      content: get(portal, "targetArea.title", ""),
      arrow: false,
      offset: [0, 5],
      theme: "name",
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
  class="portal"
  bind:this={portalEl}
  id={portal._id}
  alt={portal.title}
  style={inlineStyles}
>
  {#if portal.iconImage}
    <img src={urlFor(portal.iconImage).quality(100).height(100).url()} />
  {/if}
</div>

<style lang="scss">
  @import "../../variables.scss";

  .portal {
    height: 32px;
    width: 32px;
    // border-radius: 50%;
    // border: 1px solid $black;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: opacity 0.5s $transition;
    pointer-events: none;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: $grey;
  }
</style>
