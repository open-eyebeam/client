<script>
  // # # # # # # # # # # # # #
  //
  //  WORLD
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte"
  import { get, sample, has, inRange } from "lodash"
  // import { links, navigate } from "svelte-routing"
  // import MediaQuery from "svelte-media-query"
  // *** OVERLAYS
  import LoadingScreen from "./overlays/LoadingScreen.svelte"
  import Error from "./overlays/Error.svelte"
  import Reconnection from "./overlays/Reconnection.svelte"
  // *** WORLD LAYERS
  import Room from "./world-layers/Room.svelte"
  import Players from "./world-layers/Players.svelte"
  import Objects from "./world-layers/objects/Objects.svelte"
  import Zones from "./world-layers/zones/Zones.svelte"
  import AmbientAudio from "./world-layers/AmbientAudio.svelte"
  import Portals from "./world-layers/portals/Portals.svelte"
  import Target from "./world-layers/TargetMarker.svelte"
  // *** UI COMPONENTS
  import Header from "./header/header.svelte"
  import AuthenticationBox from "./ui-components/AuthenticationBox.svelte"
  import StreamPlayer from "./ui-components/StreamPlayer.svelte"
  import ArticleBox from "./ui-components/ArticleBox.svelte"
  // *** TEXT COMPONENTS
  import RoomEntryBox from "./text-components/RoomEntryBox.svelte"
  import Caption from "./text-components/Caption.svelte"
  // *** CHAT
  import Chat from "./chat/Chat.svelte"
  // *** GRAPHICS
  import SoundOn from "./graphics/SoundOn.svelte"
  import SoundOff from "./graphics/SoundOff.svelte"

  // *** GLOBAL
  import { nanoid, getRandomInt } from "./global.js"

  import {
    connectToGameServer,
    moveTo,
    goToRoom,
    // moveQ,
    players,
    chatMessages,
    showTarget,
    targetX,
    targetY,
    submitChat,
  } from "./core/core.js"

  import {
    configureAuthClient,
    isAuthenticated,
    profile,
  } from "./authentication/authentication.js"

  import { localPlayer } from "./local-player/local-player.js"
  import { buildWorld, worldObject, loadAvatars, GRID_SIZE } from "./data.js"
  import { deltaJump } from "./misc/page-visibility.js"
  import {
    pressedKeys,
    initializeKeyboardHandler,
    keyReleased,
  } from "./misc/keyboard-handler.js"
  import { UI, STATE, setUIState } from "./misc/ui-state.js"
  import { transitionWorldIn, transitionWorldOut } from "./misc/transitions.js"
  import {
    showGrid,
    showLabels,
    playSound,
    activeArticle,
    trayOpen,
  } from "./stores.js"

  import { initializeStreamsHandler, streams } from "./misc/streams.js"

  // *** VARIABLES
  let reconnectionAttempts = 0
  let disconnectionCode = 0
  let captions = []
  let currentRoom = false
  let viewportElement = {}
  let roomIntent = false
  let avatars = []
  let newRoomIntroduction = false
  let activeZone = false

  // DEBUG
  // $: console.log("__ CHANGED: $localPlayer", $localPlayer)
  // $: console.log("__ CHANGED: $worldObject", $worldObject)
  // $: console.log("__ CHANGED: $players", $players)
  // $: console.log("currentRoom", currentRoom)
  // $: console.log("$keyReleased", $keyReleased)
  // $: console.log("$chatMessages", $chatMessages)
  // $: console.log("roomIntent", roomIntent)
  // $: console.log("$activeArticle", $activeArticle)
  $: console.log("$streams", $streams)
  $: console.log("activeZone", activeZone)

  let windowHeight = window.innerHeight
  let windowWidth = window.innerWidth

  const calculateWindowSize = () => {
    windowHeight = window.innerHeight
    windowWidth = window.innerWidth
  }

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

  const checkPortalOverlap = () => {
    // console.log("__ Check portal overlap...")
    if (currentRoom.portals && Array.isArray(currentRoom.portals)) {
      // console.log("currentRoom.portals", currentRoom.portals)
      // console.log("$players[$localPlayer.uuid]", $players[$localPlayer.uuid])
      let overlapIndex = false
      currentRoom.portals.forEach(p => {
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
    // console.log("__ Check zone overlap...")
    const avatarElement = document.getElementById($localPlayer.uuid)
    let overlapIndex = false
    currentRoom.zones.forEach(z => {
      console.log(z)
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
    // console.log("CHANGE ROOM", id)
    let newRoom = $worldObject[id]
    showLabels.set(false)
    await transitionWorldOut(viewportElement)
    currentRoom = newRoom
    goToRoom({
      id: newRoom._id,
      x: getRandomInt(4, 6),
      y: getRandomInt(4, 6),
    })
    await transitionWorldIn(viewportElement)
    showLabels.set(true)
    console.log("newRoom", newRoom)
    if (has(newRoom, "introductionTexts")) {
      newRoomIntroduction = newRoom.introductionTexts
    } else {
      newRoomIntroduction = false
    }
  }

  const animationLoop = () => {
    const step = timestamp => {
      // console.log("step", timestamp)
      // console.log("moveQ", moveQ)
      // __ Keyboard navigation
      if ($players[$localPlayer.uuid]) {
        if (Object.values(pressedKeys).some(k => k)) {
          // console.log("KEY PRESSED", pressedKeys)
          if (pressedKeys["UP"]) {
            // console.log("UP")
            if ($players[$localPlayer.uuid].y > 0) {
              players.update(ps => {
                ps[$localPlayer.uuid].y -= 1
                return ps
              })
            }
          }
          if (pressedKeys["DOWN"]) {
            // console.log("DOWN")
            if (
              $players[$localPlayer.uuid].y <
              currentRoom.dimensions.height * GRID_SIZE - 30
            ) {
              players.update(ps => {
                ps[$localPlayer.uuid].y += 1
                return ps
              })
            }
          }
          if (pressedKeys["LEFT"]) {
            // console.log("LEFT")
            if ($players[$localPlayer.uuid].x > 0) {
              players.update(ps => {
                ps[$localPlayer.uuid].x -= 1
                return ps
              })
            }
          }
          if (pressedKeys["RIGHT"]) {
            // console.log("RIGHT")
            if (
              $players[$localPlayer.uuid].x <
              currentRoom.dimensions.width * GRID_SIZE - 30
            ) {
              players.update(ps => {
                ps[$localPlayer.uuid].x += 1
                return ps
              })
            }
          }
          moveTo(
            $players[$localPlayer.uuid].x,
            $players[$localPlayer.uuid].y,
            true
          )
          checkPortalOverlap()
          checkZoneOverlap()
          pressedKeys["UP"] = false
          pressedKeys["DOWN"] = false
          pressedKeys["LEFT"] = false
          pressedKeys["RIGHT"] = false
        }
      }
      window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  }

  onMount(async () => {
    console.time("mount")
    console.log("__ => Mounting...")

    try {
      await configureAuthClient()
    } catch (e) {
      console.log("Error in authentication:", e)
    }
    console.log("✓ (1) Auth client configured ")

    await buildWorld()
    console.log("✓ (2) World built")
    // Set first room
    for (const [key, value] of Object.entries($worldObject)) {
      if ($worldObject[key].mainArea) {
        currentRoom = $worldObject[key]
        break
      }
    }

    avatars = await loadAvatars()
    console.log("✓ (3) Avatars loaded")

    // ___ Give the local user a UUID
    localPlayer.update(lp => {
      lp.uuid = nanoid()
      return lp
    })

    let playerObject = {
      uuid: $localPlayer.uuid,
      name: $profile && $profile.username ? $profile.username : "Test player",
      shape: sample(avatars)._id,
      onboarded: true,
      room: currentRoom._id,
      x: getRandomInt(10, 30),
      y: getRandomInt(5, 15),
    }

    await connectToGameServer(playerObject)
    console.log("✓ (4) Game server connected")

    await initializeKeyboardHandler()
    console.log("✓ (5) Keyboard initialized")

    initializeStreamsHandler()
    console.log("✓ (6) Stream listener initialized")

    animationLoop()
    console.log("✓ (7) Animation loop started")

    if (has(currentRoom, "introductionTexts")) {
      newRoomIntroduction = currentRoom.introductionTexts
    }
    console.log("✓ (7) Show main room introduction")

    console.timeEnd("mount")
  })
</script>

<!-- Header -->
<Header {currentRoom} />

<!-- GAME WORLD -->
{#if currentRoom}
  <div
    class="viewport"
    class:pushed={$trayOpen}
    bind:this={viewportElement}
    class:blurred={UI.state == STATE.ONBOARDING}
  >
    <Room
      room={currentRoom}
      x={get($players[$localPlayer.uuid], "x", 100)}
      y={get($players[$localPlayer.uuid], "y", 100)}
      on:move={e => {
        moveTo(e.detail.x, e.detail.y, false)
      }}
    >
      <!-- PLAYERS -->
      <!-- {#if Array.isArray($players)} -->
      <Players players={$players} currentRoomId={currentRoom._id} {avatars} />
      <!-- {/if} -->
      <!-- OBJECTS -->
      <Objects objects={get(currentRoom, "objects", [])} />
      <!-- ZONES -->
      <Zones zones={get(currentRoom, "zones", [])} />
      <!-- PORTALS -->
      <Portals portals={get(currentRoom, "portals", [])} />
      <!-- TARGET -->
      {#if $showTarget}
        <Target x={$targetX} y={$targetY} />
      {/if}
    </Room>
  </div>
{/if}

<!-- AMBIENT AUDIO -->
{#if has(currentRoom, "backgroundSound.asset") && $playSound}
  <AmbientAudio soundFile={currentRoom.backgroundSound} />
{/if}

<!-- AUTH TEST BOX -->
{#if UI.state == STATE.READY}
  <AuthenticationBox />
{/if}

<!-- LIVE STREAM -->
{#each $streams as stream}
  {#if currentRoom._id == stream.parentArea._ref || activeZone._id == stream.parentArea._ref}
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

{#if !$trayOpen && !$activeArticle}
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
    chatMessages={$chatMessages.filter(m => m.room === currentRoom._id)}
    on:submit={e => {
      // console.log("e", e)
      submitChat(e, currentRoom)
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
  @import "./variables.scss";

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
