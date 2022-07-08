<script>
  // * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  //  __layout.svelte =>
  //  Contains the menubar and other interface elements.
  //  Loads index.svelte in the <slot/> component.
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * *

  // *** OVERLAYS
  import LoadingScreen from "$lib/components/overlays/LoadingScreen.svelte"
  import Error from "$lib/components/overlays/Error.svelte"
  import Reconnection from "$lib/components/overlays/Reconnection.svelte"
  // *** UI COMPONENTS
  import Menubar from "$lib/components/menubar.svelte"
  import AuthenticationBox from "$lib/components/AuthenticationBox.svelte"
  // *** GRAPHICS
  import SoundOn from "$lib/components/graphics/SoundOn.svelte"
  import SoundOff from "$lib/components/graphics/SoundOff.svelte"
  import {
    STATE,
    uiState,
    showLabels,
    playSound,
    activeArticle,
    trayOpen,
  } from "$lib/modules/ui.js"
  import { currentRoom } from "$lib/modules/movement.js"
  // *** VARIABLES
  let reconnectionAttempts = 0
  let disconnectionCode = 0
  $: {
    if ($currentRoom.autoplay) {
      playSound.set(true)
    } else {
      playSound.set(false)
    }
  }
</script>

<!-- MENUBAR -->
{#if $uiState == STATE.READY}
  <Menubar currentRoom={$currentRoom} />
{/if}

<!-- Content from index.svelte -->
<slot />

<!-- AUTH TEST BOX -->
{#if $uiState == STATE.READY && !$activeArticle}
  <AuthenticationBox />
{/if}

<!-- LOADING -->
{#if $uiState == STATE.LOADING}
  <LoadingScreen />
{/if}

<!-- ERROR -->
{#if $uiState == STATE.ERROR}
  <Error message={""} />
{/if}

<!-- DISCONNECTED -->
{#if $uiState == STATE.DISCONNECTED}
  <Reconnection {reconnectionAttempts} {disconnectionCode} />
{/if}

<!-- OPTIONS -->
{#if !$trayOpen && !$activeArticle}
  <div class="options">
    <div
      class="option sound"
      on:click={() => {
        playSound.set(!$playSound)
      }}
    >
      {#if $playSound}
        <SoundOn />
      {:else}
        <SoundOff />
      {/if}
    </div>
    <div
      class="option labels"
      class:on={$showLabels}
      on:click={() => {
        showLabels.set(!$showLabels)
      }}
    >
      <span>abc</span>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";

  * {
    box-sizing: border-box;
    font-family: $SERIF_STACK;
  }

  .viewport {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    // overflow: scroll;
    opacity: 1;
    transition: transform 0.5s $transition;
    background: $e-ink-dark;

    &.pushed {
      transform: translateY(240px);
    }
  }

  .grid-toggle {
    position: fixed;
    top: 70px;
    left: 20px;
    padding: 5px;
    background: $e-ink-light;
    font-size: 10px;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: $e-ink-medium;
    }
  }

  .options {
    position: fixed;
    top: 40px;
    right: 75px;

    @include screen-size("small") {
      display: none;
    }

    .option {
      margin-left: 5px;
      font-size: $font-size-extra-small;
      background: $e-ink-medium;
      float: right;
      padding: 5px;
      user-select: none;
      cursor: pointer;
      border: 1px solid $e-ink-dark;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        line-height: 1.2em;
      }

      &.on {
        span {
          background: $e-ink-dark;
          color: $e-ink-light;
        }
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
</style>
