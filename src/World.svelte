<script>
  // # # # # # # # # # # # # #
  //
  //  WORLD
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte"
  import { get, sample, has } from "lodash"
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
  import Menubar from "./ui-components/Menubar.svelte"
  import AuthenticationBox from "./ui-components/AuthenticationBox.svelte"
  import StreamPlayer from "./ui-components/StreamPlayer.svelte"
  import ArticleBox from "./ui-components/ArticleBox.svelte"
  // *** TEXT COMPONENTS
  import RoomEntryBox from "./text-components/RoomEntryBox.svelte"
  import Onboarding from "./text-components/Onboarding.svelte"
  // *** CHAT
  import Chat from "./chat/Chat.svelte"

  // *** GLOBAL
  import { nanoid, isOverlapping, getRandomInt } from "./global.js"

  import {
    connectToGameServer,
    moveTo,
    goToRoom,
    moveQ,
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
  import { showGrid, showLabels, playSound, activeArticle } from "./stores.js"

  // *** VARIABLES
  let reconnectionAttempts = 0
  let disconnectionCode = 0
  let captions = []
  let currentRoom = false
  let viewportElement = {}
  let roomIntent = false
  let avatars = []

  // DEBUG
  // $: console.log("__ CHANGED: $localPlayer", $localPlayer)
  // $: console.log("__ CHANGED: $worldObject", $worldObject)
  // $: console.log("__ CHANGED: $players", $players)
  // $: console.log("currentRoom", currentRoom)
  // $: console.log("$keyReleased", $keyReleased)
  // $: console.log("$chatMessages", $chatMessages)
  // $: console.log("roomIntent", roomIntent)
  $: console.log("$activeArticle", $activeArticle)

  let windowHeight = window.innerHeight
  let windowWidth = window.innerWidth

  const calculateWindowSize = () => {
    windowHeight = window.innerHeight
    windowWidth = window.innerWidth
  }

  // $: {
  //   console.log("windowHeight", windowHeight)
  //   console.log("windowWidth", windowWidth)
  // }

  // $: {
  //   if (currentRoom.dimensions) {
  //     console.log("currentRoom.dimensions.width", currentRoom.dimensions.width)
  //     console.log(
  //       "currentRoom.dimensions.height",
  //       currentRoom.dimensions.height
  //     )
  //   }
  // }

  // $: {
  //   if ($players[$localPlayer.uuid]) {
  //     console.log(
  //       "$players[$localPlayer.uuid].x,",
  //       $players[$localPlayer.uuid].x
  //     )
  //     console.log(
  //       "$players[$localPlayer.uuid].y",
  //       $players[$localPlayer.uuid].y
  //     )
  //   }
  // }

  // $: if ($keyReleased) {
  //   moveTo($players[$localPlayer.uuid].x, $players[$localPlayer.uuid].y, true)
  //   $keyReleased.set(false)
  // }

  const checkPortalOverlap = () => {
    // console.log("__ Check portal overlap...")
    const avatarElement = document.getElementById($localPlayer.uuid)
    if (
      avatarElement &&
      currentRoom.portals &&
      Array.isArray(currentRoom.portals)
    ) {
      let overlapIndex = false
      currentRoom.portals.forEach(p => {
        // console.log(p)
        let portalElement = document.getElementById(p._id)
        if (portalElement && isOverlapping(avatarElement, portalElement)) {
          overlapIndex = p.targetArea._id
        }
      })
      if (overlapIndex) {
        roomIntent = overlapIndex
      } else {
        roomIntent = false
      }
    }
    // console.log("roomIntent", roomIntent)
  }

  const checkZoneOverlap = () => {
    // console.log("__ Check zone overlap...")
    const avatarElement = document.getElementById($localPlayer.uuid)
    currentRoom.zones.forEach(z => {
      // console.log(z)
      let zoneElement = document.getElementById(z._id)
      if (zoneElement && isOverlapping(avatarElement, zoneElement)) {
        console.log("in zone", z)
      }
    })
  }

  const changeRoom = async id => {
    // console.log("CHANGE ROOM", id)
    let newRoom = $worldObject[id]
    await transitionWorldOut(viewportElement)
    currentRoom = newRoom
    goToRoom({
      id: newRoom._id,
      x: getRandomInt(
        get(newRoom, "landingZone.minX", 0),
        get(newRoom, "landingZone.maxX", 100)
      ),
      y: getRandomInt(
        get(newRoom, "landingZone.minY", 0),
        get(newRoom, "landingZone.maxY", 100)
      ),
    })
    await transitionWorldIn(viewportElement)
  }

  const animationLoop = () => {
    const step = timestamp => {
      // console.log("moveQ", moveQ)
      // __ Keyboard navigation
      if ($players[$localPlayer.uuid]) {
        if (Object.values(pressedKeys).some(k => k)) {
          // console.log("KEY PRESSED", pressedKeys)
          if (pressedKeys["UP"]) {
            // console.log("UP")
            if ($players[$localPlayer.uuid].y > 0) {
              players.update(ps => {
                ps[$localPlayer.uuid].y -= 2
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
                ps[$localPlayer.uuid].y += 2
                return ps
              })
            }
          }
          if (pressedKeys["LEFT"]) {
            // console.log("LEFT")
            if ($players[$localPlayer.uuid].x > 0) {
              players.update(ps => {
                ps[$localPlayer.uuid].x -= 2
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
                ps[$localPlayer.uuid].x += 2
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
        }
      }

      for (let key in moveQ) {
        // console.log("$players[key]", $players[key].room)
        // && $players[key].room === currentRoom._id
        if ($players[key]) {
          if (moveQ[key].length > 0) {
            if (moveQ[key].length - $deltaJump < 0) {
              // User reached destination while the window was out of focus
              // Move to final step and clear users's move queue
              let step = moveQ[key][moveQ[key].length - 1]
              $players[key].x = step.x
              $players[key].y = step.y
              delete moveQ[key]
              if ($players[key].self) {
                showTarget.set(false)
                checkPortalOverlap()
                checkZoneOverlap()
              }
            } else {
              // Get next step, adjusting for delta
              moveQ[key].splice(0, $deltaJump - 1)
              let step = moveQ[key].shift()
              // console.log(step.x, step.y)
              // console.log("$players[key]", $players[key])
              $players[key].x = step.x
              $players[key].y = step.y
              // if ($players[key].self) {
              //   // checkDoorOverlap()
              // }
            }
          } else {
            // console.log("___ DONE")
            // Destination reached
            // console.log($players[key])
            if ($players[key].self) {
              targetX.set(0)
              targetY.set(0)
              showTarget.set(false)
              checkPortalOverlap()
              checkZoneOverlap()
            }
            delete moveQ[key]
          }
        } else {
          delete moveQ[key]
        }
      }
      deltaJump.set(0)
      window.requestAnimationFrame(step)
    }
    // !!! TODO: CENTER VIEW ON PLAYER
    window.requestAnimationFrame(step)
  }

  onMount(async () => {
    console.time("mount")
    console.log("__ => Mounting...")

    window.onresize = calculateWindowSize

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
      name: "Test player",
      shape: sample(avatars)._id,
      onboarded: true,
      room: currentRoom._id,
      x: getRandomInt(
        get(currentRoom, "landingZone.minX", 0),
        get(currentRoom, "landingZone.maxX", 100)
      ),
      y: getRandomInt(
        get(currentRoom, "landingZone.minY", 0),
        get(currentRoom, "landingZone.maxY", 100)
      ),
    }

    await connectToGameServer(playerObject)
    console.log("✓ (4) Game server connected")

    await initializeKeyboardHandler()
    console.log("✓ (5) Keyboard initialized")

    animationLoop()
    console.log("✓ (6) Animation loop started")

    console.timeEnd("mount")
  })
</script>

<!-- MENUBAR -->
<Menubar {currentRoom} />

<!-- GAME WORLD -->
{#if currentRoom}
  <div
    class="viewport"
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
{#if currentRoom.stream}
  <StreamPlayer streamUrl={currentRoom.stream} />
{/if}

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

<!-- ARTICLE BOX -->
{#if $activeArticle}
  <ArticleBox article={$activeArticle} />
{/if}

<!-- CHAT-->
<!-- {#if showChat} -->
<!-- $chatMessages.filter(m => m.room === currentRoom) -->
<Chat
  chatMessages={$chatMessages.filter(m => m.room === currentRoom._id)}
  on:submit={e => {
    // console.log("e", e)
    submitChat(e, currentRoom)
  }}
/>
<!-- {/if} -->

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
<div class="options">
  <div
    class="option sound"
    on:click={() => {
      playSound.set(!$playSound)
    }}
  >
    sound {$playSound ? "off" : "on"}
  </div>
  <div
    class="option labels"
    on:click={() => {
      showLabels.set(!$showLabels)
    }}
  >
    labels {$showLabels ? "off" : "on"}
  </div>
</div>

<!-- DEBUG: GRID grid-toggle -->
<div
  class="grid-toggle"
  on:click={() => {
    showGrid.set(!$showGrid)
  }}
>
  {$showGrid ? "Hide" : "Show"} grid (Debug)
</div>

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
    transition: opacity 1s ease-out filter 1s ease-out;
    background: $COLOR_DARK;

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
    background: $white;
    font-size: 10px;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: $grey;
    }
  }

  .options {
    position: fixed;
    top: 40px;
    right: 20px;

    .option {
      margin-left: 5px;
      font-size: 10px;
      background: $white;
      text-transform: uppercase;
      float: right;
      padding: 5px;
      user-select: none;
      cursor: pointer;

      &:hover {
        background: $black;
        color: $white;
      }
    }
  }
</style>
