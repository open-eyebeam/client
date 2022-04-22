<script>
  // # # # # # # # # # # # # #
  //
  //  VIDEO
  //
  // # # # # # # # # # # # # #

  // __ IMPORTS
  import { loadData, urlFor } from "$lib/modules/sanity.js"
  import get from "lodash/get.js"

  // __ GRAPHICS
  import PlayArrow from "$lib/components/graphics/play-arrow.svelte"

  // *** PROPS
  export let b = {}

  const videoPost = loadData("*[_id == $id][0]", { id: b.videoPost._ref })
  // videoPost.then((v) => {
  // 	console.log('v', v);
  // });
</script>

{#await videoPost then videoPost}
  <a href={"/videos/" + get(videoPost, "slug.current")} class="video-block">
    <!-- MAIN IMAGE -->
    {#if videoPost.mainImage}
      <img
        class="main-image"
        alt={videoPost.title}
        src={urlFor(videoPost.mainImage).quality(90).width(400).url()}
      />
    {/if}
    <div class="icon">
      <PlayArrow />
    </div>
    <div class="title">{videoPost.title}</div>
  </a>
{/await}

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .video-block {
    text-decoration: none;
    width: 100%;
    position: relative;
    display: block;
    height: 400px;
    margin-bottom: $small-margin;

    img {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .title {
      display: block;
      position: absolute;
      top: 10px;
      left: 80px;
      z-index: 10;
      color: $e-ink-light;
      font-size: $font-size-h2;
      line-height: 1.2em;
    }

    .icon {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 100;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: $e-ink-light;
      color: $e-ink-light;
      line-height: 1.2em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
