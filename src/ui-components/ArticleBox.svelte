<script>
  // # # # # # # # # # # # # #
  //
  //  Article box
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { renderBlockText } from "../sanity.js"
  import { has } from "lodash"
  import { activeArticle } from "../stores.js"
  // *** UI COMPONENTS
  import StreamPlayer from "./StreamPlayer.svelte"

  //   *** PROPS
  export let article = {}
  console.log("article", article)
</script>

<div
  class="article"
  transition:fade
  on:click={() => {
    activeArticle.set(false)
  }}
>
  {#if article.contentType === "video"}
    <StreamPlayer streamUrl={article.videoUrl} />
  {:else if has(article, "content.content")}
    <div class="inner">
      {@html renderBlockText(article.content.content)}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../variables.scss";

  .article {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner {
      background: $COLOR_LIGHT;
      color: $COLOR_DARK;
      width: 600px;
      height: 700px;
      max-width: 90%;
      max-height: 85%;
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
