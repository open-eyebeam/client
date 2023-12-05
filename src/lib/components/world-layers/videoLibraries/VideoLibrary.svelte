<script>
  export let events = [];
  export let vLib = [];
  import { dateTimeFormat, isUpcoming, isOngoing, sortByDate } from "$lib/modules/utilities.js";
  import {STATE, uiState, isPhone} from '$lib/modules/ui.js';
  import VideoLibraryComponent from './VideoLibraryComponent.svelte';


  let selected = null;


  $: vLib, vLib.map(ev => {
    if (selected == null) {
      selected = ev;
    }
  });

  $: vLib.sort(sortByDate);
</script>

<div id="video-library-container" class:is-mobile={$isPhone}>
  <h3>Video Library</h3>
  <div class="videos">
    {#each vLib as lib}
      {#if lib.activeVideos.length > 0}
      <VideoLibraryComponent {lib} />
      {/if}
    {/each}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";



  .is-mobile {
    display:none !important;
  }

  .mobile-button {
    display: none;
  }

  #video-library-container {
    right: 20px;
    height: 90vh;
    top: 80px;
    position: fixed;
    width: 90%;
    z-index: 10000;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    align-items: center;
    justify-content: center;
    background: $e-ink-light;
    border: 1px solid $e-ink-medium;
    color: $e-ink-dark;
    overflow-x: auto;







    h3 {
      width: 100%;
      font-size: 45px;
      text-align: center;
      padding: 4px;
      margin: 0 auto;
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