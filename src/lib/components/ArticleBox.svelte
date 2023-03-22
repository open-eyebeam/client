<script>
  // # # # # # # # # # # # # #
  //
  //  Article box
  //
  // # # # # # # # # # # # # #
  import { onMount, onDestroy } from "svelte"
  import { fade } from "svelte/transition"
  import has from "lodash/has.js"
  import { activeArticle, trayOpen } from "$lib/modules//ui.js"
  import { loadDataFromMainSite } from "$lib/modules//sanity.js"
  import { enterArticle, leaveArticle, players } from "$lib/modules/engine.js"
  import { checkObjectOverlap } from "$lib/modules/movement.js"
  import VideoPlayer from "$lib/components/VideoPlayer.svelte"
  import Blocks from "$lib/components/blocks/blocks.svelte"
  import BulletinBoardEvent from "$lib/components/bulletin-board-event.svelte"

  // *** PROPS
  export let article = {}

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
  <div aria-live="polite" class="viewer-count">{viewCountText}</div>
{/if}

<button
  class="return-button"
  aria-label="Return"
  on:click={() => {
    activeArticle.set(false)
    checkObjectOverlap()
  }}
>
  Return
</button>

{#if article.contentType === "video"}
  <div
    class="video"
    aria-live="polite"
    class:pushed={$trayOpen}
    transition:fade
    on:click={e => {
      if (e.target.classList.contains("video")) {
        activeArticle.set(false)
      }
    }}
  >
    <VideoPlayer streamUrl={article.videoUrl} />
  </div>
{:else if article.contentType === "text"}
  {#if has(article, "content.content")}
    <div
      class="article"
      aria-live="polite"
      class:pushed={$trayOpen}
      transition:fade
      on:click={e => {
        if (e.target.classList.contains("article")) {
          activeArticle.set(false)
        }
      }}
    >
      <div class="inner">
        <Blocks blocks={article.content.content} />
      </div>
    </div>
  {/if}
{:else if article.contentType === "importedPost"}
  <div
    class="article"
    class:pushed={$trayOpen}
    aria-live="polite"
    transition:fade
    on:click={e => {
      if (e.target.classList.contains("article")) {
        activeArticle.set(false)
      }
    }}
  >
    <div class="inner">
      {#if importedPost && importedPost.title}
        {importedPost.title}
        {#if has(importedPost, "content.content")}
          <Blocks blocks={importedPost.content.content} mainSite={true} />
        {/if}
      {/if}
    </div>
  </div>
{:else if article.isBulletinBoard}
  <div
    class="bulletin-board"
    class:pushed={$trayOpen}
    aria-live="polite"
    transition:fade
    on:click={e => {
      if (e.target.classList.contains("bulletin-board")) {
        activeArticle.set(false)
      }
    }}
  >
    <div class="inner">
      <h1 >Bulletin Board</h1>
      <div class="bulletin-board-actions">
        <!-- <div class="action">Subscribe to Calendar</div> -->
      </div>
      <div class="bulletin-board-events">
        {#each article.events as event}
          <BulletinBoardEvent {event} />
        {/each}
      </div>
    </div>
  </div>
{/if}

{#if article.infoText}
  <div class="info-text">
    {article.infoText}
  </div>
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";
  button {
    all: unset;
  }

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
    cursor: pointer;

    .inner {
      background: $e-ink-medium;
      color: $e-ink-dark;
      width: 800px;
      max-width: 90%;
      z-index: 10000;
      padding: 20px;
      overflow-y: scroll;
      font-size: $font-size-small;
      cursor: default;

      @include screen-size("small") {
        width: 90%;
      }
    }

    transition: transform 0.5s $transition;

    &.pushed {
      transform: translateY(240px);
    }
  }

  :global(.article img) {
    max-width: 100%;
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
    cursor: pointer;

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
    cursor: pointer;
    h1 {
      margin: 0;
    }

    .inner {
      background: $e-ink-medium;
      color: $e-ink-dark;
      width: 800px;
      max-width: 90%;
      z-index: 10000;
      padding: 20px;
      overflow-y: scroll;
      font-size: $font-size-small;
      cursor: default;

      .bulletin-board-actions {
        .action {
          padding: 10px;
          border: $border-style;
          display: inline-block;
        }
      }

      .bulletin-board-actions {
        margin-top: 20px;
        margin-bottom: 20px;
        display: inline-block;
      }
    }

    transition: transform 0.5s $transition;

    &.pushed {
      transform: translateY(240px);
    }
  }
</style>
