<script>
  // # # # # # # # # # # # # #
  //
  //  Portal
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { onMount } from "svelte"
  import { urlFor, renderBlockText } from "../../sanity.js"
  import { has, get } from "lodash"

  //   *** PROPS
  export let portal = {}

  let portalEl = {}

  const inlineStyles = `transform: translateY(${portal.y}px) translateX(${
    portal.x
  }px); width: ${portal.dimensions.width}px; height: ${
    portal.dimensions.height
  }px; background-color: ${get(
    portal,
    "backgroundColor.hex",
    "#ff0000"
  )}; background-image: url("${get(portal, "bgImageUrl", "")}");"`

  onMount(async () => {
    // tippy(portalEl, {
    //   content: portal.title,
    //   arrow: false,
    //   offset: [0, 5],
    //   //   showOnCreate: true,
    //   sticky: true,
    //   //   hideOnClick: false,
    // })
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
    height: 30px;
    width: 30px;
    // border-radius: 50%;
    background: $COLOR_DARK;
    border: 1px solid $COLOR_DARK;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: opacity 0.5s $transition;
    pointer-events: none;
    background-size: contain;
  }
</style>
