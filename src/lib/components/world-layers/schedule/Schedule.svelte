<script>
  export let events = []
  //FIXME: absolutely should not be doing this twice whatever is going on here
  // getting static "vLib" from index, then videoLibrary from world
  // but it works for now so :)
  export let vLib = []
  import { videoLibrary } from "$lib/modules/world.js"
  import { dateTimeFormat, isUpcoming, isOngoing, sortByDate } from "$lib/modules/utilities.js"
  import Embed from "$lib/components/blocks/embed.svelte"
  import {STATE, uiState, isPhone} from '$lib/modules/ui.js'
  import { activeArticle } from "$lib/modules/ui.js"
  //events.sort(sortByDate)
  // videoLibrary.sort(sortByDate)
  // use object styling for video library
</script>
<!--
<div id="schedule-container" class:is-mobile={$isPhone}>
    <h2>UPCOMING</h2>
    {#each events as event}
      {#if event.startDate}
      {#if isUpcoming(event) && !isOngoing(event)}
        <div class="event">{dateTimeFormat(event.startDate)}: {event.title}</div>
      {/if}
      {/if}
  {/each}
</div> -->
<div id="schedule-container" class:is-mobile={$isPhone}>
  <h2>RECENT</h2>
    {#each vLib as video}
      {#if video.active}
      <div class="event past"
        on:click={() => {
          video.showVideo = true
            videoLibrary.set($videoLibrary.map(v => {
              if (v.key == video.key) {
                v.showVideo = true
                v.hidden = false
              }
              return v
            }))
        }}

      >{dateTimeFormat(video.startDate)}: {video.title}</div>
      {/if}
    {/each}
</div>


    <style lang="scss">
  @import "src/lib/style/variables.scss";
  
  .is-mobile {
    display:none !important;
  }
  .mobile-button {
    display: none;
  }
  #schedule-container {
    right: 20px;
    max-height:200px;
    top: 80px;
    position: fixed;
    width: 300px;
    z-index: 10000;
   display: flex;
   flex-wrap: wrap;
   overflow: scroll;
    align-items: center;
    justify-content: center;
   background: $e-ink-dark;
    border: 1px solid $e-ink-medium;
    color: $e-ink-medium;
       h2 {
       width: 100%;
     text-align: center;
       }
       .event {
        width: 100%;
        padding: $SPACE_S;
        text-align: center;
        &.past {
          text-decoration: underline;
          cursor: pointer;
        }
       }

    &.is-mobile {
      bottom: 425px;
      right: 10px;
      width: calc(100% - 20px);
    }
    &.minimize {
      width: calc(30% - 10px);
      height: auto;
    }

  }
#recent-container {
    right: 20px;
    max-height:100%;
    top: 300px;
    position: fixed;
    width: 300px;
    z-index: 10000;
     display: flex;
     flex-wrap: wrap;
    align-items: center;
    justify-content: center;
   background: $e-ink-dark;
    border: 1px solid $e-ink-medium;
    color: $e-ink-medium;
       h2 {
       width: 100%;
     text-align: center;
       }
       .event {
        width: 100%;
        padding: $SPACE_S;
        text-align: center;
        &.past {
          text-decoration: underline;
          cursor: pointer;
        }
       }

    &.is-mobile {
      bottom: 425px;
      right: 10px;
      width: calc(100% - 20px);
    }
    &.minimize {
      width: calc(30% - 10px);
      height: auto;
    }

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

      &.close-chat {
        width: 40px;
        margin-left: $SPACE_S;
      }
    }
  .is-mobile {
    .mobile-button {
      display:block;
      width: 100%;
      z-index: 1001;
    }
    .hidden-mobile {
      display:none
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
