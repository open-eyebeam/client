<script>
  // # # # # # # # # # # # # #
  //
  //  Object
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { onMount } from "svelte"
  import { urlFor, renderBlockText } from "../../sanity.js"
  import { has, get } from "lodash"
  import { showLabels } from "../../stores.js"
  import { GRID_SIZE } from "../../data.js"

  //   *** PROPS
  export let object = {}

  // *** VARIABLES
  let objectEl = {}
  let showArticle = false
  let label = {}
  let gridPosY = object.y * GRID_SIZE
  let gridPosX = object.x * GRID_SIZE
  let gridWidth = get(object, "dimensions.width", 1) * GRID_SIZE
  let gridHeight = get(object, "dimensions.height", 1) * GRID_SIZE

  // console.log("object", object)

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
      theme: "name",
      hideOnClick: false,
      sticky: true,
      trigger: "manual",
    })
  })
</script>

<div
  transition:fade
  class="object"
  bind:this={objectEl}
  class:image={object.iconImage}
  id={object._id}
  alt={object.title}
  style={inlineStyles}
  on:click={() => {
    showArticle = true
  }}
>
  {#if object.iconImage}
    <img src={urlFor(object.iconImage).quality(100).height(100).url()} />
  {/if}
</div>

{#if showArticle}
  <div
    class="article"
    transition:fade
    on:click={() => {
      showArticle = false
    }}
  >
    {#if has(object, "content.content")}
      {@html renderBlockText(object.content.content)}
    {/if}
  </div>
{/if}

<style lang="scss">
  @import "../../variables.scss";

  .object {
    height: 32px;
    width: 32px;
    overflow: hidden;
    background: red;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: opacity 0.5s $transition;

    &:hover {
      opacity: 0.8;
    }

    &.image {
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  .article {
    background: $COLOR_LIGHT;
    color: $COLOR_DARK;
    position: fixed;
    top: 50px;
    left: 50px;
    width: 500px;
    height: 600px;
    z-index: 10000;
    padding: 10px;
    overflow-y: scroll;
    font-size: $FONT_SIZE_SMALL;
  }

  :global(.article img) {
    max-width: 100%;
  }
</style>
