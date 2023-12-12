<script>

  import { longFormatDate } from "$lib/modules/utilities.js"
  export let lib;
  import getVideoId from "get-video-id"
  import {isPhone} from '$lib/modules/ui.js';


  let videosByDate = {};
  let selectedVideos = [];


  let selectedDate = null;

  let selected = null;
  console.log("lib!!",lib.activeVideos)

  $: if (lib) {
    videosByDate = {};
    lib.activeVideos.forEach(video => {
      console.log("video.startDate",video.startDate)
      if(video.startDate !== undefined){
        const date = video.startDate?.split('T')[0];
      
        if (!videosByDate[date]) {
          videosByDate[date] = [];
        }
        videosByDate[date].push(video);
      }
    });

    if (Object.keys(videosByDate).length > 0 && !selectedDate) {
      selectedDate = Object.keys(videosByDate)[0];
      selectedVideos = videosByDate[selectedDate];
    }
  }

  function selectDate(date) {
    console.log("selectDate",date)
    console.log("videosByDate[date]",videosByDate[date])
    selectedDate = date;
    selectedVideos = videosByDate[date];
    console.log("ted",selectedVideos)
  }


</script>


    <div class="video-item" class:is-mobile={$isPhone}>
      <span class="title-button">
      <span class="title" >{lib.title}</span></span>
        {#each Object.keys(videosByDate) as date}
      <div class="tabs">
          <button class="video-tab" on:click={() => selectDate(date)}>{longFormatDate(date)}</button>
      </div>
      <div class="video-carousel">
            {#each selectedVideos as video}
          <a href ={"https://www.youtube.com/embed/" +
                   getVideoId(video.videoUrl).id +
                   "?rel=0&color=white"} class="video">

            <div class="video-title">{video.title}</div>
            <div class="video-description">{video.description === undefined ? "" : video.description}</div>
          </a>
        {/each}
      </div>
        {/each}
    </div>


<style lang="scss">
  @import "src/lib/style/variables.scss";

    a {
      text-decoration: none;
    }
    .video-item {
      margin: $SPACE_M 0 ;
      .tabs {
        display: flex;
        margin-top: $SPACE_L;
        margin-left: $SPACE_XS;

      }
      .video-tab {
        width: 225px;
        height: 44px;
        background: linear-gradient(180deg, #D9EBF0 0%, rgba(217, 235, 240, 0) 100%);
        border-radius: 20px 20px 0px 0px;
        border: 0px;
      }

      &.is-mobile {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title {
          font-size: $font-size-small;
        }
        .title-button {
          padding: $SPACE_S;
        }
      }
    }
  .video-carousel {
    display: inline-flex;
    padding: $SPACE_XS $SPACE_XS;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    scrollbar-width: thin;


    .video {
      
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: $e-ink-light;
      flex: 0 0 auto; // prevent videos from shrinking
      padding: $SPACE_S; // add some space between videos
      margin: $SPACE_S; // add some space between videos
      border-radius: 10px;
      border: 1px solid $e-ink-dark;
      background: $e-ink-light;

      .room {
        display: flex;
        .room-content{
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: $SPACE_S;
        }
        .room-name{
          font-weight: 700;
          font-size: 10px;



        }
      }
      .video-title {
        margin: $SPACE_XS 0;
        font-weight: 700;
        font-size: $font-size-small;
      }
      .video-description {
        word-wrap: break-word; 
        width:100%;
        color: #000;
        font-size: $font-size-extra-small;
      }

      // existing video styles...
    }
  }
    .title-button {
      .title {
        font-size: 24px;
      color: $e-ink-light;
      width: 100%;
      
      }
      padding: $SPACE_S $SPACE_M;
      background-color: $e-ink-dark;
      border-radius: 5px;
      margin: 0 $SPACE_S;
    }

    h3 {
      width: 100%;
      font-size: 45px;
      text-align: center;
      padding: 4px;
      margin: 0 auto;
    }





  button {
    font-family: $SERIF_STACK;
    font-size: $font-size-small;
    width: 60px;
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

  .is-mobile {


    .mobile-button {
      display:block;
      width: 100%;
      z-index: 1001;
    }

    .hidden-mobile {
      display:none;
    }

    .minimize {
      width: 40px;
      height: 40px;
      font-weight: bold;
      position: absolute;
      right: 0;
    }
  }
</style>