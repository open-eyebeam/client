<script>
  // # # # # # # # # # # # # #
  //
  //  Stream Player
  //
  // # # # # # # # # # # # # #

  // Have to include in app.html due to SSR issues
  // import { PeerTubePlayer } from "@peertube/embed-api"
  const PeerTubePlayer = window["PeerTubePlayer"]
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { quartOut } from "svelte/easing"
  import getVideoId from "get-video-id"
  import PlayArrow from "$lib/components/graphics/play-arrow.svelte"
  import PauseBars from "$lib/components/graphics/pause-bars.svelte"

  // *** PROPS
  export let streamUrl = ""
  export let audioOnly = false
  export let title = ""

  let audioPlayer
  let playing = false
  let position = 0

  const togglePlay = () => {
    if (playing) {
      audioPlayer.pause()
    } else {
      audioPlayer.play()
    }
    playing = !playing
  }

  onMount(async () => {
    if (streamUrl.includes("undersco.re")) {
      audioPlayer = new PeerTubePlayer(document.querySelector(".peertube"))
      await audioPlayer.ready
      audioPlayer.play()
      playing = true
      audioPlayer.setResolution(3)
      audioPlayer.addEventListener("playbackStatusUpdate", e => {
        position = (e.position / e.duration).toFixed(4) * 100
      })
    }
  })
</script>

<div
  class="stream-container"
  class:audio={audioOnly}
  transition:fade={{ duration: 300, easing: quartOut }}
>
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
    {:else if streamUrl.includes("undersco.re")}
      <div class="peertube-container" class:hidden={audioOnly}>
        <iframe
          class="peertube"
          width="1920"
          height="1080"
          src={streamUrl + "?api=1"}
          frameborder="no"
          color="#ffffff"
          allow="autoplay; fullscreen"
          sandbox="allow-same-origin allow-scripts allow-popups"
          allowfullscreen
        />
      </div>
      {#if audioOnly}
        <div class="audio-interface">
          <div class="title">{title}</div>
          <div class="controls">
            <div class="control" on:click={togglePlay}>
              {#if playing}
                <PauseBars />
              {:else}
                <PlayArrow />
              {/if}
            </div>
            <div class="playbar">
              <div class="progress" style={"width: " + position + "%;"} />
            </div>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>


<iframe class="discord-widget" src="https://e.widgetbot.io/channels/806275264807698482/1082423999092510810" height="300" width="400" style="sidebar:display:none;"></iframe>
<style lang="scss">
  @import "src/lib/style/variables.scss";
  .discord-widget {
    position: fixed;
    right: 20px;
    bottom: 20px;
    position: fixed;
    width: 300px;
    max-width: 35%;
    height: 70%;
    z-index: 10001;

  }
  .stream-container {
    position: absolute;
    top: 110px;
    left: 10px;
    width: 55%;
    //height: 50%;
    border: 1px solid $e-ink-dark;
    z-index: 10000;

    &.audio {
      width: 360px;
    }

    @include screen-size("small") {
      position: fixed;
      left: 20px;
      width: calc(100vw - 40px);
    }

    .embed {
      width: 100%;
      background: $e-ink-light;
      display: flex;
      padding: 5px;

      .peertube-container,
      .youtube-container,
      .vimeo-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        width: 1080px;

        &.hidden {
          display: none;
        }

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

  .audio-interface {
    padding: 10px;
    width: 100%;

    .title {
      width: 100%;
    }

    .controls {
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;

      .control {
        height: 40px;
        width: 40px;
        background: $e-ink-medium;
        text-align: center;
        user-select: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .playbar {
        background: $e-ink-medium;
        width: calc(100% - 50px);
        height: 40px;

        .progress {
          height: 100%;
          background: $e-ink-dark;
        }
      }
    }
  }
</style>
