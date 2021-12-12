<script>
  // # # # # # # # # # # # # #
  //
  //  WORLD
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte"
  import { get, sample } from "lodash"
  import { fade } from "svelte/transition"
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
  // *** TEXT COMPONENTS
  import Caption from "./text-components/Caption.svelte"
  import Onboarding from "./text-components/Onboarding.svelte"
  // *** CHAT
  import Chat from "./chat/Chat.svelte"

  // *** GLOBAL
  import { nanoid, isOverlapping } from "./global.js"

  import {
    connectToGameServer,
    moveTo,
    moveQ,
    players,
    chatMessages,
    showTarget,
    targetX,
    targetY,
  } from "./core/core.js"

  import {
    configureAuthClient,
    isAuthenticated,
  } from "./authentication/authentication.js"

  import { localPlayer } from "./local-player/local-player.js"
  import { buildWorld, worldObject } from "./data.js"
  import { deltaJump } from "./misc/page-visibility.js"
  import {
    pressedKeys,
    initializeKeyboardHandler,
  } from "./misc/keyboard-handler.js"
  import { UI, STATE, setUIState } from "./misc/ui-state.js"
  import has from "lodash/has"

  // DEBUG
  // $: console.log("__ CHANGED: $localPlayer", $localPlayer)
  // $: console.log("__ CHANGED: $worldObject", $worldObject)
  $: console.log("currentRoom", currentRoom)

  // *** VARIABLES
  let reconnectionAttempts = 0
  let disconnectionCode = 0

  let soundFile = false
  let streamUrl = false

  let captions = []
  // let submitChat = {}
  // let showChat = false

  let currentRoom = false

  const checkPortalOverlap = () => {
    // console.log("__ Check portal overlap...")
    const avatarElement = document.getElementById($localPlayer.uuid)
    currentRoom.portals.forEach(p => {
      // console.log(p)
      let portalElement = document.getElementById(p._id)
      if (portalElement && isOverlapping(avatarElement, portalElement)) {
        changeRoom(p.targetArea._ref)
      }
    })
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

  const changeRoom = id => {
    console.log("CHANGE ROOM", id)
    currentRoom = $worldObject[id]
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
            if ($players[$localPlayer.uuid].y) {
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
            if ($players[$localPlayer.uuid].x) {
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
            console.log("___ DONE")
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

    // await configureAuthClient()
    // console.log("✓ (1) Auth client configured ")

    await buildWorld()
    console.log("✓ (2) World built")
    // Set first room
    for (const [key, value] of Object.entries($worldObject)) {
      if ($worldObject[key].mainArea) {
        currentRoom = $worldObject[key]
        break
      }
    }

    // ___ Give the local user a UUID
    localPlayer.update(lp => {
      lp.uuid = nanoid()
      return lp
    })

    let playerObject = {
      uuid: $localPlayer.uuid,
      name: "",
      shape: "",
      onboarded: false,
    }
    playerObject.shape = "star"
    playerObject.onboarded = true
    await connectToGameServer(playerObject)
    console.log("✓ (3) Game server connected")

    await initializeKeyboardHandler()
    console.log("✓ (4) Keyboard initialized")

    animationLoop()
    console.log("✓ (5) Animation loop started")

    console.timeEnd("mount")
  })
</script>

<!-- MENUBAR -->
<Menubar />

<!-- GAME WORLD -->
{#if currentRoom}
  <div class="viewport" class:blurred={UI.state == STATE.ONBOARDING}>
    <Room
      room={currentRoom}
      on:move={e => {
        moveTo(e.detail.x, e.detail.y, false)
      }}
    >
      <!-- PLAYERS -->
      <Players players={$players} />
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
{#if has(currentRoom, "backgroundSound.asset")}
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
<!-- {#if UI.state == STATE.READY}
  <Caption
    {captions}
    on:room={e => {
      // console.log(e)
      captions = []
      goToRoom(e.detail.roomId)
    }}
  />
{/if} -->

<!-- CHAT-->
<!-- {#if showChat} -->
<!-- <Chat
    chatMessages={chatMessages.filter(m => m.room === $currentArea)}
    on:submit={submitChat}
  /> -->
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
</style>
