<script>

  import { longFormatDate } from "$lib/modules/utilities.js"
  export let lib;
  import getVideoId from "get-video-id"
  import {isPhone} from '$lib/modules/ui.js';


  let videosByDate = {};
  let selectedVideos = [];


  let selectedDate = null;

  let selected = null;
  let carousel;

function scrollLeft() {
  carousel.scrollBy({ left: -300, behavior: 'smooth' });
}

function scrollRight() {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });
}
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
      <div class="tabs">
        {#each Object.keys(videosByDate) as date}
          <button class="video-tab" on:click={() => selectDate(date)}>{longFormatDate(date)}</button>
        {/each}
      </div>
      <div class="video-carousel-container">
  <a class="carousel-arrow left" on:click={scrollLeft}>
<svg xmlns="http://www.w3.org/2000/svg" width="54" height="65" viewBox="0 0 54 65" fill="none">
  <rect width="53.0421" height="64.0625" fill="black"/>
  <path d="M36.6234 46.1077L6.45246 29.6875L36.6234 13.2673L36.6234 46.1077Z" fill="white" stroke="black" stroke-width="3"/>
</svg>
</a>

      <div class="video-carousel">
            {#each selectedVideos as video}
          <div class="video">

             <div class="youtube-container">
               <iframe
                 src={"https://www.youtube.com/embed/" +
                   getVideoId(video.videoUrl).id +
                   "?rel=0&color=white"}
                 frameborder="no"
                 allow="autoplay; fullscreen"
                 allowfullscreen
               />
            </div>
             <div>
              {#if video.rooms && video.rooms.length > 0}
             <div class="room">
                {#each video.rooms as room}
                <div class="room-content">
                  <div class="room-image">
                    <img width="36" height="36" src={room.bgImageUrl} />
                  </div>
                  <div class="room-name">
                    {room.title}
                  </div>
                </div>
                {/each}
                </div>
              {/if}
            </div>
            <div class="video-title">{video.title}</div>
            <div class="video-description">{video.description === undefined ? "" : video.description}</div>
          </div>
        {/each}
      </div>
        <a class="carousel-arrow right" on:click={scrollRight}>
  <svg xmlns="http://www.w3.org/2000/svg" width="54" height="65" viewBox="0 0 54 65" fill="none">
<rect x="0.957031" width="53.0421" height="64.0625" fill="black"/>
<path d="M15.7146 47.6702L45.8856 31.25L15.7146 14.8298L15.7146 47.6702Z" fill="white" stroke="black" stroke-width="3"/>
</svg>
</a>
      </div>

    </div>


<style lang="scss">
  @import "src/lib/style/variables.scss";

.video-carousel-container {
  position: relative;
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 10;
    
    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  }
}

    .video-item {
      margin: $SPACE_XL 0 ;
      .tabs {
        display: flex;
        margin-top: $SPACE_L;
        margin-left: $SPACE_XS;


      }
      .video-tab {
        width: 100px;
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
    margin: $SPACE_XL $SPACE_XL;
    padding: $SPACE_XL $SPACE_XL;
    display: flex;
    background-image: url("images/background_field.png");
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: $e-ink-medium $e-ink-dark;
    border-radius: 5px;
    border: 5px solid #000;



    .video {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;
      height: 530px;
      background-color: $e-ink-light;
      flex: 0 0 auto; // prevent videos from shrinking
      padding: $SPACE_L; // add some space between videos
      margin: 0 $SPACE_L; // add some space between videos
      border-radius: 20px;
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
        .room-image{

        }
        .room-name{
          font-weight: 700;
          font-size: 10px;



        }
      }
      .youtube-container{
        width: 300px;

      }
      .video-title {
        text-align: center;
        margin: $SPACE_M 0;
        font-size: 20px;
      }
      .video-description {
        word-wrap: break-word; 
        width:100%;
        color: #000;
        font-size: 15px;
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
      margin-bottom: $SPACE_L;
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