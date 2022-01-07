<script>
  // # # # # # # # # # # # # #
  //
  //  Article box
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { has } from "lodash"
  import { activeArticle } from "../stores.js"

  // *** UI COMPONENTS
  import StreamPlayer from "./StreamPlayer.svelte"
  import Blocks from "../blocks/blocks.svelte"

  //   *** PROPS
  export let article = {}
  console.log("article", article)
</script>

<div
  class="return-button"
  on:click={() => {
    activeArticle.set(false)
  }}
>
  return
</div>

<div class="article" transition:fade>
  {#if article.contentType === "video"}
    <StreamPlayer streamUrl={article.videoUrl} />
  {:else if has(article, "content.content")}
    <div class="inner">
      <Blocks blocks={article.content.content} />
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../variables.scss";

  .return-button {
    position: fixed;
    top: 40px;
    left: 20px;
    background: $e-ink-light;
    color: $e-ink-dark;
    padding: 5px;
    font-size: $font-size-extra-small;
    z-index: 100000;
    cursor: pointer;
  }

  .article {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $e-ink-dark;
    z-index: 10000;
    display: flex;
    padding-top: 60px;
    padding-bottom: 60px;
    justify-content: center;
    // align-items: center;
    // overflow-y: auto;

    .inner {
      background: $e-ink-medium;
      color: $e-ink-dark;
      width: 800px;
      max-width: 90%;
      z-index: 10000;
      padding: 20px;
      overflow-y: scroll;
      font-size: $font-size-small;
    }
  }

  :global(.article img) {
    max-width: 100%;
  }
</style>
