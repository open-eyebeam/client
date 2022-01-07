<script>
  // # # # # # # # # # # # # #
  //
  //  EMBED RENDERER
  //
  // # # # # # # # # # # # # #

  // __ IMPORTS
  import has from "lodash/has.js"
  import getVideoId from "get-video-id"

  // __ BLOCKS
  import Blocks from "./blocks.svelte"

  // *** PROPS
  export let b = {}
</script>

<div class="embed">
  <div class="inner">
    {#if b.url.includes("youtube")}
      <iframe
        width="720"
        height="480"
        src="https://www.youtube.com/embed/{getVideoId(b.url).id}"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    {/if}
    {#if b.url.includes("vimeo")}
      <iframe
        width="720"
        height="480"
        src="https://player.vimeo.com/video/{getVideoId(b.url).id}"
        frameborder="0"
        byline="false"
        color="#ffffff"
        allow="autoplay; fullscreen"
        allowfullscreen
      />
    {/if}
  </div>
</div>

{#if has(b, "caption.content")}
  <figcaption>
    <Blocks blocks={b.caption.content} />
  </figcaption>
{/if}

<style lang="scss">
  @import "../variables.scss";

  .embed {
    color: $e-ink-light;
    margin-bottom: $small-margin;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    padding-bottom: $small-margin;
    padding-top: $small-margin;

    width: 100%;

    .inner {
      width: 720px;

      @include screen-size("small") {
        width: 480px;
      }

      iframe {
        width: 100%;
      }
    }

    &.full {
      .inner {
        width: 100vw;

        iframe {
          height: 100vh;
        }
      }
    }
  }
</style>
