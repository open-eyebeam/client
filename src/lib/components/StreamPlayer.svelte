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
  import { isPhone  } from "$lib/modules/ui.js"
  import getVideoId from "get-video-id"
  import PlayArrow from "$lib/components/graphics/play-arrow.svelte"
  import PauseBars from "$lib/components/graphics/pause-bars.svelte"

  // *** PROPS
  export let streamUrl = ""
  export let audioOnly = false
  export let title = ""
  export let isVideoLib = false
  export let showVideo = false
  export let streamRect = {}
  export let hidden = true
  function hide() {
    hidden = true  
  }

  let audioPlayer
  let playing = false
  let position = 0
  let streamEl={}
  
  
  const togglePlay = () => {
    if (playing) {
      audioPlayer.pause()
    } else {
      audioPlayer.play()
    }
    playing = !playing
  }

  onMount(async () => {
    streamRect = streamEl.getBoundingClientRect();
    if (streamUrl.includes("undersco.re")) {
      audioPlayer = new PeerTubePlayer(document.querySelector(".peertube"))
      await audioPlayer.ready
      audioPlayer.play()
      playing = true
      audioPlayer.setResolution(2)
      audioPlayer.addEventListener("playbackStatusUpdate", e => {
        position = (e.position / e.duration).toFixed(4) * 100
      })
    }
  })
  $: console.log('show video: ', showVideo)
  $: hidden, console.log('hidden: ', hidden)
  
</script>

<div
  class="stream-container"
  class:audio={audioOnly}
  class:is-video-lib={isVideoLib && !showVideo}
  class:hidden={hidden}
  bind:this={streamEl}
  transition:fade={{ duration: 300, easing: quartOut }}
>
  <div id="show-hide"
  on:click={hide}
  >X</div>
  <div class="embed">
    {#if streamUrl.includes("youtube") || streamUrl.includes("youtu.be")}
      <div class="youtube-container"

      class:hidden={hidden}
      >
      {#if !hidden}
        <iframe
          width="1920"
          height="1280"
          src={"https://www.youtube.com/embed/" +
            getVideoId(streamUrl).id + (isVideoLib ? "" :
            "?autoplay=1") + "&rel=0&color=white"}
          frameborder="no"
          allow="autoplay; fullscreen"
          allowfullscreen
        />
        {/if }
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


<style lang="scss">
  @import "src/lib/style/variables.scss";
  .stream-container {
    position: absolute;
    top: 20px;
    left: 10px;
    width: 40%;
    //height: 50%;
    border: 1px solid $e-ink-dark;
    z-index: 10000;
    &.hidden {
          display: none;
        }
    &.is-video-lib {
      display: none;
    }
    &.audio {
      width: 360px;
    }
    #show-hide {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10000000;
       font-family: $SERIF_STACK;
      font-size: $font-size-small;
      float: right;
      display: block;
      background: $e-ink-medium;
      border: $border-style;
      color: $e-ink-dark;
      outline: none;
      cursor: pointer;
      border-radius: 0;
      height: 40px;
      padding: 10px;
      line-height: 20px;

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
