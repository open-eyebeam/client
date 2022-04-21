<script>
  // # # # # # # # # # # # # #
  //
  //  WORLD
  //
  // # # # # # # # # # # # # #
  // *** IMPORTS
  import { onMount } from "svelte"
  import get from "lodash/get.js"
  import sample from "lodash/sample.js"
  import has from "lodash/has.js"
  import inRange from "lodash/inRange.js"
  // *** OVERLAYS
  import LoadingScreen from "$lib/components/overlays/LoadingScreen.svelte"
  import Error from "$lib/components/overlays/Error.svelte"
  import Reconnection from "$lib/components/overlays/Reconnection.svelte"
  // *** WORLD LAYERS
  import Room from "$lib/components/world-layers/Room.svelte"
  import Players from "$lib/components/world-layers/Players.svelte"
  import Objects from "$lib/components/world-layers/objects/Objects.svelte"
  import Zones from "$lib/components/world-layers/zones/Zones.svelte"
  import AmbientAudio from "$lib/components/world-layers/AmbientAudio.svelte"
  import Portals from "$lib/components/world-layers/portals/Portals.svelte"
  import Target from "$lib/components/world-layers/TargetMarker.svelte"
  // *** UI COMPONENTS
  import Menubar from "$lib/components/menubar.svelte"
  import AuthenticationBox from "$lib/components/AuthenticationBox.svelte"
  import StreamPlayer from "$lib/components/StreamPlayer.svelte"
  import ArticleBox from "$lib/components/ArticleBox.svelte"
  // *** TEXT COMPONENTS
  import RoomEntryBox from "$lib/components/text-components/RoomEntryBox.svelte"
  import Caption from "$lib/components/text-components/Caption.svelte"
  // *** CHAT
  import Chat from "$lib/components/chat/Chat.svelte"
  // *** GRAPHICS
  import SoundOn from "$lib/components/graphics/SoundOn.svelte"
  import SoundOff from "$lib/components/graphics/SoundOff.svelte"
  // *** GLOBAL
  import { nanoid, getRandomInt } from "$lib/modules/global.js"
  import {
    connectToGameServer,
    moveTo,
    goToRoom,
    players,
    chatMessages,
    showTarget,
    targetX,
    targetY,
    submitChat,
  } from "$lib/modules/core.js"
  import {
    configureAuthClient,
    isAuthenticated,
    profile,
  } from "$lib/modules/authentication.js"
  import { localPlayer } from "$lib/modules/local-player.js"
  import {
    buildWorld,
    worldObject,
    loadAvatars,
    GRID_SIZE,
  } from "$lib/modules/data.js"
  import { initializeKeyboardHandler } from "$lib/modules/keyboard-handler.js"
  import {
    UI,
    STATE,
    setUIState,
    infoLogger,
    errorLogger,
  } from "$lib/modules/ui.js"
  import {
    transitionWorldIn,
    transitionWorldOut,
  } from "$lib/modules/transitions.js"
  import {
    showGrid,
    showLabels,
    playSound,
    activeArticle,
    trayOpen,
    currentRoom,
  } from "$lib/modules/ui.js"

  import { initializeStreamsHandler, streams } from "$lib/modules/streams.js"

  // *** VARIABLES
  let reconnectionAttempts = 0
  let disconnectionCode = 0
  let captions = []
  let viewportElement = {}
  let roomIntent = false
  let avatars = []
  let newRoomIntroduction = false
  let activeZone = false

  // DEBUG
  // $: infoLogger("__ CHANGED: $localPlayer", $localPlayer)
  // $: infoLogger("__ CHANGED: $worldObject", $worldObject)
  // $: infoLogger("__ CHANGED: $players", $players)
  // $: infoLogger("$currentRoom", $currentRoom)
  // $: infoLogger("$keyReleased", $keyReleased)
  // $: infoLogger("$chatMessages", $chatMessages)
  // $: infoLogger("roomIntent", roomIntent)
  // $: infoLogger("$activeArticle", $activeArticle)
  // $: infoLogger("$streams", $streams)
  // $: infoLogger("activeZone", activeZone)

  // let windowHeight = window.innerHeight
  // let windowWidth = window.innerWidth

  // const calculateWindowSize = () => {
  //   windowHeight = window.innerHeight
  //   windowWidth = window.innerWidth
  // }

  // const timedKeyRelease = () => {
  //   window.setTimeout(() => {
  //     keyReleased.set(true)
  //   }, 400)
  // }

  // $: {
  //   if (!$keyReleased) {
  //     timedKeyRelease()
  //   }
  // }

  $: {
    if (roomIntent) {
      newRoomIntroduction = false
    }
  }

  $: {
    if ($players[$localPlayer.uuid]) {
      if ($players[$localPlayer.uuid].x || $players[$localPlayer.uuid].x) {
        checkPortalOverlap()
        checkZoneOverlap()
      }
    }
  }

  const checkPortalOverlap = () => {
    if ($currentRoom.portals && Array.isArray($currentRoom.portals)) {
      let overlapIndex = false
      $currentRoom.portals.forEach(p => {
        if (
          $players[$localPlayer.uuid].x === p.x &&
          $players[$localPlayer.uuid].y === p.y
        ) {
          overlapIndex = p.targetArea._id
        }
      })
      if (overlapIndex) {
        roomIntent = overlapIndex
      } else {
        roomIntent = false
      }
    }
  }

  const checkZoneOverlap = () => {
    const avatarElement = document.getElementById($localPlayer.uuid)
    let overlapIndex = false
    $currentRoom.zones.forEach(z => {
      if (
        inRange($players[$localPlayer.uuid].x, z.x, z.x + z.dimensions.width) &&
        inRange($players[$localPlayer.uuid].y, z.y, z.y + z.dimensions.height)
      ) {
        overlapIndex = z
      }
    })
    if (overlapIndex) {
      activeZone = overlapIndex
    } else {
      activeZone = false
    }
  }

  const changeRoom = async id => {
    let newRoom = $worldObject[id]
    showLabels.set(false)
    await transitionWorldOut(viewportElement)
    currentRoom.set(newRoom)
    goToRoom({
      id: newRoom._id,
      x: getRandomInt(4, 6),
      y: getRandomInt(4, 6),
    })
    await transitionWorldIn(viewportElement)
    showLabels.set(true)
    if (has(newRoom, "introductionTexts")) {
      newRoomIntroduction = newRoom.introductionTexts
    } else {
      newRoomIntroduction = false
    }
  }

  onMount(async () => {
    // Starting up the app...
    infoLogger("__ => App starting...")

    // Configure authentication client
    try {
      await configureAuthClient()
    } catch (e) {
      errorLogger("Error in authentication:", e)
    }
    infoLogger("✓ (1) Auth client configured ")

    // 3 - Build world
    await buildWorld()
    infoLogger("✓ (2) World built")
    // Set the starting room
    for (const [key, value] of Object.entries($worldObject)) {
      if ($worldObject[key].mainArea) {
        currentRoom.set($worldObject[key])
        break
      }
    }

    // Load avatars
    avatars = await loadAvatars()
    infoLogger("✓ (3) Avatars loaded")

    // ___ Give the local user a UUID
    localPlayer.update(lp => {
      lp.uuid = nanoid()
      return lp
    })

    // Construct the player object
    let playerObject = {
      uuid: $localPlayer.uuid,
      name: $profile && $profile.name ? $profile.name : "Test player",
      shape: has($profile, "avatar._ref")
        ? $profile.avatar._ref
        : sample(avatars)._id,
      onboarded: true,
      room: $currentRoom._id,
      x: getRandomInt(10, 30),
      y: getRandomInt(5, 15),
    }

    // Connect to game server
    await connectToGameServer(playerObject)
    infoLogger("✓ (4) Game server connected")

    // Initialize keyboard handler
    await initializeKeyboardHandler()
    infoLogger("✓ (5) Keyboard initialized")

    // Initialize streams handler
    initializeStreamsHandler()
    infoLogger("✓ (6) Stream listener initialized")

    // Show introduction text
    if (has($currentRoom, "introductionTexts")) {
      newRoomIntroduction = $currentRoom.introductionTexts
    }
    infoLogger("✓ (7) Show main room introduction")

    // ... done!
    infoLogger("__ => App loaded")
  })
</script>

<!-- MENUBAR -->
<Menubar currentRoom={$currentRoom} />

<!-- GAME WORLD -->
{#if $currentRoom}
  <div
    class="viewport"
    class:pushed={$trayOpen}
    bind:this={viewportElement}
    class:blurred={UI.state == STATE.ONBOARDING}
  >
    <Room
      room={$currentRoom}
      x={get($players[$localPlayer.uuid], "x", 100)}
      y={get($players[$localPlayer.uuid], "y", 100)}
      on:move={e => {
        moveTo(e.detail.x, e.detail.y, false)
      }}
    >
      <!-- PLAYERS -->
      <!-- {#if Array.isArray($players)} -->
      <Players players={$players} currentRoomId={$currentRoom._id} {avatars} />
      <!-- {/if} -->
      <!-- OBJECTS -->
      <Objects objects={get($currentRoom, "objects", [])} />
      <!-- ZONES -->
      <Zones zones={get($currentRoom, "zones", [])} />
      <!-- PORTALS -->
      <Portals portals={get($currentRoom, "portals", [])} />
      <!-- TARGET -->
      {#if $showTarget}
        <Target x={$targetX} y={$targetY} />
      {/if}
    </Room>
  </div>
{/if}

<!-- AMBIENT AUDIO -->
{#if has($currentRoom, "backgroundSound.asset") && $playSound}
  <AmbientAudio soundFile={$currentRoom.backgroundSound} />
{/if}

<!-- AUTH TEST BOX -->
{#if UI.state == STATE.READY}
  <AuthenticationBox />
{/if}

<!-- LIVE STREAM -->
{#each $streams as stream}
  {#if $currentRoom._id == stream.parentArea._ref || activeZone._id == stream.parentArea._ref}
    <StreamPlayer streamUrl={stream.videoUrl} />
  {/if}
{/each}

<!-- CAPTION BOX -->
{#if roomIntent}
  <RoomEntryBox
    {roomIntent}
    roomTitle={$worldObject[roomIntent].title}
    on:room={e => {
      if (e.detail.roomId) {
        changeRoom(roomIntent)
      }
      roomIntent = false
    }}
  />
{/if}

{#if !$trayOpen && !$activeArticle && !roomIntent}
  {#if newRoomIntroduction}
    <Caption
      text={newRoomIntroduction}
      on:close={e => {
        newRoomIntroduction = false
      }}
    />
  {/if}
{/if}

<!-- ARTICLE BOX -->
{#if $activeArticle}
  <ArticleBox article={$activeArticle} />
{/if}

<!-- CHAT-->
{#if !$trayOpen && !$activeArticle}
  <Chat
    chatMessages={$chatMessages.filter(m => m.room === $currentRoom._id)}
    on:submit={e => {
      submitChat(e, $currentRoom)
    }}
  />
{/if}

<!-- ONBOARDING -->
<!-- {#if UI.state == STATE.ONBOARDING}
      <Onboarding
        on:onboard={e => {
          onboardUser(e.detail.username, e.detail.shape)
        }}
      />
    {/if} -->

<!-- LOADING -->
{#if UI.state == STATE.LOADING}
  <LoadingScreen />
{/if}

<!-- ERROR -->
{#if UI.state == STATE.ERROR}
  <Error message={UI.errorMessage} />
{/if}

<!-- DISCONNECTED -->
{#if UI.state == STATE.DISCONNECTED}
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

<!-- DEBUG: GRID grid-toggle -->

<!-- <div
      class="grid-toggle"
      on:click={() => {
        showGrid.set(!$showGrid)
      }}
    >
      {$showGrid ? "Hide" : "Show"} grid (Debug)
    </div> -->
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
