<script>
  import { fade } from "svelte/transition"
  import { quartOut } from "svelte/easing"
  import { activeFeed } from "$lib/modules//ui.js"
  import Blocks from "$lib/components/blocks/blocks.svelte"
  import FeedItem from "$lib/components/world-layers/feed/FeedItem.svelte"
  export let feedItems = []
  export let isActive = false
  export let artistImageUrl
  export let artistName
  export let artistBio
  $: isActive, activeFeed.set(isActive)
  $: console.log('artist bio: ', artistBio)
  $: console.log('is active: ', isActive)
  $: console.log('feed: ', feedItems)
</script>

{#if $activeFeed }

<div class="feed-container" in:fade={{ duration: 300, easing: quartOut}}>
  <button
    class="return-button"
    aria-label="Return"
    on:click={() => {
      console.log('should be setting active feed to false')
      activeFeed.set(false)
      console.log('active feed: ', activeFeed)
    }}
  >
  Return
  </button>
  {#if artistName != undefined}
  <div class="feed-about">
    {#if artistImageUrl != undefined}
    <img src={artistImageUrl} />
  {/if}
    <div class="info">
      <h5>{artistName}'s Feed</h5>
      <Blocks blocks= {artistBio == undefined ? [] : artistBio.content} />  
    </div>
    </div>
  {/if}

  {#each feedItems as feedItem}
    <div class="inner">
      <FeedItem {feedItem} />
    </div>
  {/each}
</div>
{:else}
  {#if artistName != undefined}
  <div class="feed-widget" on:click={()=> {
    activeFeed.set(true)
  }}>
    {#if artistImageUrl != undefined}
    <img src={artistImageUrl} />
  {/if}
    <h3>{artistName}'s Feed</h3>
  </div>
  {/if}
{/if }

<style lang="scss">
@import "src/lib/style/variables.scss";
button {
  all: unset;
}
  .feed-widget {
    position: fixed;
    cursor: pointer;
    background: $e-ink-medium;
    top: 80px;
    right: 20px;
    width: 160px;
    display: flex;
    flex-flow: row wrap;
    z-index: 10000;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    img {
      margin-top: 12px;
      width: 80px;
      height: 80px;
      object-fit: cover;
    }
    @include screen-size('small') {
      max-width: 120px;
      top: 40px;
      right: 10px;
      img {
      display: none;
    }
    h3 {
      font-size: 14px;
    }
  }
  
}
  .feed-about {
    position: fixed;
    background: $e-ink-medium;
    top: 80px;
    right: 20px;
    width: 300px;
    max-height: 300px;
    overflow-y: scroll;
    display: flex;
    flex-flow: row wrap;
    z-index: 10000;
    align-items: flex-start;
    justify-content: center;
    padding: 0 12px;
    img {
      margin-top: 12px;
      width:30%;
      height:30%;
      object-fit: cover;
  }
  .info {
      max-width: 70%;
      padding-left: 12px;
      display: flex;
      font-size: $font-size-small;
      flex-flow: row wrap;
  }
    @include screen-size('small') {
      position: relative;
      right: auto;
      top: 15px;
      margin-bottom: 20px;
      max-width: 90%;
    }

}
  .feed-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    background: $e-ink-dark;
    z-index: 10000;
    display: flex;
    flex-flow: row wrap;
    padding-top: 60px;
    padding-bottom: 80px;
    justify-content: left;
    overflow-y: scroll;
    cursor: pointer;
  

    .inner {
      background: $e-ink-medium;
      color: $e-ink-dark;
      width: 60%;
      max-width: 60%;
      margin: 20px 0;
      margin-left: 10%;
      z-index: 10000;
      padding: 8px;
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
    overflow-y: scroll;

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

</style>
