<script>
  // # # # # # # # # # # # # #
  //
  //  Article box
  //
  // # # # # # # # # # # # # #
  import { onMount, onDestroy } from "svelte"
  import { fade } from "svelte/transition"
  import { has } from "lodash"
  import { activeArticle } from "../stores.js"
  import { trayOpen } from "../stores.js"
  import { loadDataFromMainSite } from "../sanity.js"
  // *** UI COMPONENTS
  import VideoPlayer from "./VideoPlayer.svelte"
  import Blocks from "../blocks/blocks.svelte"

  import { enterArticle, leaveArticle, players } from "../core/core.js"

  //   *** PROPS
  export let article = {}
  console.log("article", article)

  let viewCount = 0
  let viewCountText = ""
  let importedPost

  $: {
    viewCount = 0
    for (const [key, value] of Object.entries($players)) {
      if (value.viewing === article._id) {
        viewCount++
      }
    }
  }

  $: viewCountText =
    viewCount === 1
      ? "You are the only one here."
      : `${viewCount} people are here.`

  onMount(async () => {
    enterArticle(article)
    if (article.contentType === "importedPost" && article.importedPost) {
      importedPost = await loadDataFromMainSite(
        "*[_id == '" + article.importedPost + "'][0]"
      )
    }
  })

  onDestroy(async () => {
    leaveArticle()
  })
</script>

{#if article.contentType === "video"}
  <div class="viewer-count">{viewCountText}</div>
{/if}

<div
  class="return-button"
  on:click={() => {
    activeArticle.set(false)
  }}
>
  Return
</div>

{#if article.contentType === "video"}
  <div class="video" class:pushed={$trayOpen} transition:fade>
    <VideoPlayer streamUrl={article.videoUrl} />
  </div>
{:else if article.contentType === "text"}
  {#if has(article, "content.content")}
    <div class="article" class:pushed={$trayOpen} transition:fade>
      <div class="inner">
        <Blocks blocks={article.content.content} />
      </div>
    </div>
  {/if}
{:else if article.contentType === "importedPost"}
  <div class="article" class:pushed={$trayOpen} transition:fade>
    <div class="inner">
      {#if importedPost && importedPost.title}
        {importedPost.title}
        {#if has(importedPost, "content.content")}
          <Blocks blocks={importedPost.content.content} mainSite={true} />
        {/if}
      {/if}
    </div>
  </div>
{:else if article.contentType === "bulletinBoard"}
  <div class="bulletin-board" class:pushed={$trayOpen} transition:fade>
    <div class="inner">
      <h1>Welcome to the Bulletin Board</h1>
      <img src="/placeholder.png" />
      <!-- <Blocks blocks={article.content.content} /> -->
    </div>
  </div>
{/if}

{#if article.infoText}
  <div class="info-text">
    {article.infoText}
  </div>
{/if}

<style lang="scss">
  @import "../variables.scss";

  .return-button {
    position: fixed;
    top: 60px;
    left: 20px;
    background: $e-ink-light;
    color: $e-ink-dark;
    padding: 5px;
    font-size: $font-size-extra-small;
    z-index: 100000;
    cursor: pointer;
  }

  .viewer-count {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    color: $e-ink-light;
    font-size: $font-size-extra-small;
    z-index: 100000;
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
    padding-bottom: 80px;
    justify-content: center;

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

    transition: transform 0.5s $transition;

    &.pushed {
      transform: translateY(240px);
    }
  }

  :global(.article img) {
    max-width: 100%;
  }

  :global(.bulletin-board img) {
    max-width: 100%;
    border: 5px solid yellow;
  }

  .video {
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
    align-items: center;
    transition: transform 0.5s $transition;

    &.pushed {
      transform: translateY(240px);
    }
  }

  .info-text {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: $e-ink-dark;
    z-index: 10000;
    display: flex;
    padding: 10px;
    font-size: $font-size-small;
    color: $e-ink-light;
    border: 1px solid $e-ink-light;
  }

  .bulletin-board {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $e-ink-dark;
    z-index: 10000;
    display: flex;
    padding-top: 60px;
    padding-bottom: 80px;
    justify-content: center;

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

    transition: transform 0.5s $transition;

    &.pushed {
      transform: translateY(240px);
    }
  }
</style>
