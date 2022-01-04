<script>
  // # # # # # # # # # # # # #
  //
  //  Stream Player
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { quartOut } from "svelte/easing"
  import getVideoId from "get-video-id"

  // *** PROPS
  export let streamUrl = ""

  // console.log("streamUrl", streamUrl)
</script>

<div class="stream-container" in:fade={{ duration: 300, easing: quartOut }}>
  <div class="embed">
    {#if streamUrl.includes("youtube") || streamUrl.includes("youtu.be")}
      <div class="youtube-container">
        <iframe
          width="1920"
          height="1280"
          src={"https://www.youtube.com/embed/" +
            getVideoId(streamUrl).id +
            "?autoplay=1&rel=0&color=white"}
          frameborder="no"
          allow="autoplay; fullscreen"
          allowfullscreen
        />
      </div>
    {:else if streamUrl.includes("vimeo")}
      <div class="vimeo-container">
        <iframe
          width="720"
          height="480"
          src={"https://player.vimeo.com/video/" +
            getVideoId(streamUrl).id +
            "?autoplay=1"}
          frameborder="no"
          scrolling="no"
          byline="false"
          color="#ffffff"
          allow="autoplay; fullscreen"
          allowfullscreen
        />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .stream-container {
    position: absolute;
    top: 60px;
    left: 60px;
    width: 360px;
    border: 5px solid $e-ink-light;

    .embed {
      width: 100%;
      background: black;
      display: flex;
      justify-content: center;
      align-items: center;

      .youtube-container,
      .vimeo-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        width: 720px;

        iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      }
    }
  }
</style>
