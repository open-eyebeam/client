<script>
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
    currentRoom,
  } from "$lib/modules/ui.js"
  // *** VARIABLES
  let reconnectionAttempts = 0
  let disconnectionCode = 0
</script>

<!-- MENUBAR -->
{#if $uiState == STATE.READY}
  <Menubar currentRoom={$currentRoom} />
{/if}

<!-- Content from index.svelte -->
<slot />

<!-- AUTH TEST BOX -->
{#if $uiState == STATE.READY}
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

    &.disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    &.blurred {
      filter: blur(3px);
      pointer-events: none;
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
    right: 20px;

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
      // &:hover {
      //   border: 1px solid $e-ink-dark;
      // }

      span {
        line-height: 1.2em;
      }

      &.on {
        span {
          background: $e-ink-dark;
          color: $e-ink-light;
        }
      }
    }
  }
</style>
