<script>
  // # # # # # # # # # # # # #
  //
  //  Object
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { onMount } from "svelte"
  import { urlFor, renderBlockText } from "../../sanity.js"
  import { has } from "lodash"

  //   *** PROPS
  export let object = {}

  let objectEl = {}
  let showArticle = false

  // console.log("object", object)

  const inlineStyles = `transform: translateY(${object.y}px) translateX(${object.x}px);`

  onMount(async () => {
    tippy(objectEl, {
      content: object.title,
      arrow: false,
      offset: [0, 5],
      //   showOnCreate: true,
      sticky: true,
      //   hideOnClick: false,
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
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: $COLOR_DARK;
    border: 1px solid $COLOR_DARK;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    transition: opacity 0.5s $transition;

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
