<script>
  // # # # # # # # # # # # # #
  //
  //  WORLD
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte"
  import get from "lodash/get"
  import sample from "lodash/sample"
  import { fade } from "svelte/transition"
  import { urlFor, loadData, client } from "./sanity.js"
  import { links, navigate } from "svelte-routing"
  import MediaQuery from "svelte-media-query"

  // *** COMPONENTS
  import LoadingScreen from "./overlays/LoadingScreen.svelte"
  import Error from "./overlays/Error.svelte"
  import Reconnection from "./overlays/Reconnection.svelte"

  // *** NEW COMPONENTS
  import Players from "./Players.svelte"
  import Menubar from "./Menubar.svelte"
  import Target from "./TargetMarker.svelte"
  import Caption from "./Caption.svelte"
  import Onboarding from "./Onboarding.svelte"
  import AmbientAudio from "./AmbientAudio.svelte"
  import StreamPlayer from "./StreamPlayer.svelte"
  import Chat from "./Chat.svelte"
  import AuthenticationBox from "./AuthenticationBox.svelte"
  import Objects from "./Objects.svelte"

  // *** GLOBAL
  import { nanoid, isOverlapping, QUERY } from "./global.js"
  import { initializeWorld, moveTo, moveQ } from "./core/core.js"
  import {
    configureAuthClient,
    isAuthenticated,
  } from "./authentication/authentication.js"

  // *** STORES
  import {
    localUserUUID,
    localUserSessionID,
    localUserName,
    globalSettings,
    currentArea,
    maxDimension,
    profileMeta,
    profile,
    players,
    showTarget,
    targetX,
    targetY,
  } from "./stores.js"

  // $: console.log("$players", $players)

  // *** VARIABLES
  let reconnectionAttempts = 0
  let disconnectionCode = 0

  let viewportElement = {}
  let mapElement = {}

  let soundFile = false
  let streamUrl = false

  let captions = []
  let chatMessages = []
  let submitChat = {}
  let showChat = false

  const pressedKeys = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false,
  }
  let releasedKey = false

  const mainArea = loadData(
    '*[_id == "main-area"]{..., "bgImageUrl": backgroundImage.asset->url}[0]'
  ).catch(err => {
    console.log(err)
  })

  mainArea.then(mA => {
    // console.log(mA)
    let widthStyle = "width: " + mA.dimensions.width + "px;"
    let heightStyle = "height: " + mA.dimensions.height + "px;"
    let backgroundColorStyle =
      "background-color:" + mA.backgroundColor.hex + ";"
    let backgroundImageStyle = "background-image: url(" + mA.bgImageUrl + ");"

    if (mA.backgroundSound) {
      soundFile = mA.backgroundSound
    }
    mainAreaStyles =
      widthStyle + heightStyle + backgroundColorStyle + backgroundImageStyle
  })

  let mainAreaStyles = ""

  // ___ Get data from Sanity CMS
  let rooms = []
  loadData(QUERY.ROOMS)
    .catch(err => {
      console.log(err)
    })
    .then(rs => {
      // console.log("rs", rs)
      rooms = rs
    })

  let objects = loadData(QUERY.OBJECTS)

  loadData(QUERY.GLOBAL_SETTINGS)
    .then(gS => {
      globalSettings.set(gS)
    })
    .catch(err => {
      console.log(err)
    })

  // ___ Set overarching state of the UI
  const STATE = {
    ERROR: 0,
    READY: 1,
    LOADING: 2,
    DISCONNECTED: 3,
    ONBOARDING: 4,
  }

  const UI = { state: STATE.READY, errorMessage: false }

  const setUIState = (newState, errorMessage = false) => {
    // console.log("NEW STATE", newState)
    switch (newState) {
      case STATE.READY:
        UI.state = STATE.READY
        break
      case STATE.LOADING:
        UI.state = STATE.LOADING
        break
      case STATE.DISCONNECTED:
        UI.state = STATE.DISCONNECTED
        break
      case STATE.ONBOARDING:
        UI.state = STATE.ONBOARDING
        break
      default:
        UI.state = STATE.ERROR
        UI.errorMessage = errorMessage
    }
  }

  // ___ Listen for changes to page visibility (ie. tab being out of focus etc..)
  // ___ Fastforward animations when window is refocused
  let deltaJump = 0
  let hiddenTime = 0
  let hidden, visibilityChange

  if (typeof document.hidden !== "undefined") {
    hidden = "hidden"
    visibilityChange = "visibilitychange"
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden"
    visibilityChange = "msvisibilitychange"
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden"
    visibilityChange = "webkitvisibilitychange"
  }

  const handleVisibilityChange = () => {
    if (document[hidden]) {
      hiddenTime = Date.now()
    } else {
      // Number of frames missed (1000ms / 60frames ≈ 16.6666)
      deltaJump = Math.round((Date.now() - hiddenTime) / 16.6666)
      // console.log("deltaJump", deltaJump)
    }
  }

  document.addEventListener(visibilityChange, handleVisibilityChange, false)

  const animationLoop = () => {
    const step = timestamp => {
      // console.log("___ FRAME", timestamp)
      // console.log("moveQ", moveQ)

      // __ Keyboard navigation
      // if ($players[$localUserUUID]) {
      //   if (Object.values(pressedKeys).some(k => k)) {
      //     // console.log("KEY PRESSED", pressedKeys)
      //     if (pressedKeys["UP"]) {
      //       // console.log("UP")
      //       if ($players[$localUserUUID].y > 0) {
      //         $players[$localUserUUID].y -= 2
      //       }
      //     }
      //     if (pressedKeys["DOWN"]) {
      //       // console.log("DOWN")
      //       if ($players[$localUserUUID].y < $maxDimension) {
      //         $players[$localUserUUID].y += 2
      //       }
      //     }
      //     if (pressedKeys["LEFT"]) {
      //       // console.log("LEFT")
      //       if ($players[$localUserUUID].x > 0) {
      //         $players[$localUserUUID].x -= 2
      //       }
      //     }
      //     if (pressedKeys["RIGHT"]) {
      //       // console.log("RIGHT")
      //       if ($players[$localUserUUID].x < $maxDimension) {
      //         $players[$localUserUUID].x += 2
      //       }
      //     }
      //     moveTo($players[$localUserUUID].x, $players[$localUserUUID].y, true)
      //     // checkDoorOverlap()
      //   }
      //   if (releasedKey) {
      //     releasedKey = false
      //   }
      // }

      for (let key in moveQ) {
        if ($players[key]) {
          if (moveQ[key].length > 0) {
            if (moveQ[key].length - deltaJump < 0) {
              // User reached destination while the window was out of focus
              // Move to final step and clear users's move queue
              let step = moveQ[key][moveQ[key].length - 1]
              $players[key].x = step.x
              $players[key].y = step.y
              delete moveQ[key]
              if ($players[key].self) {
                showTarget.set(false)
                // checkDoorOverlap()
              }
            } else {
              // Get next step, adjusting for delta
              moveQ[key].splice(0, deltaJump - 1)
              let step = moveQ[key].shift()
              console.log(step.x, step.y)
              console.log("$players[key]", $players[key])
              $players[key].x = step.x
              $players[key].y = step.y
              if ($players[key].self) {
                // checkDoorOverlap()
              }
            }
          } else {
            console.log("___ DONE")
            // Destination reached
            console.log($players[key])
            if ($players[key].self) {
              targetX.set(0)
              targetY.set(0)
              showTarget.set(false)
              // checkDoorOverlap()
            }
            delete moveQ[key]
          }
        } else {
          delete moveQ[key]
        }
      }
      deltaJump = 0
      window.requestAnimationFrame(step)
    }
    // !!! TODO: CENTER VIEW ON PLAYER
    window.requestAnimationFrame(step)
  }

  // PLAYER => KEY DOWN
  document.addEventListener("keydown", key => {
    if (UI.state == STATE.READY) {
      // W Key is 87 & Up arrow is 87
      if (key.keyCode === 38) {
        pressedKeys["UP"] = true
      }
      // S Key is 83 & Down arrow is 40
      if (key.keyCode === 40) {
        pressedKeys["DOWN"] = true
      }
      // A Key is 65 & Left arrow is 37
      if (key.keyCode === 37) {
        pressedKeys["LEFT"] = true
      }
      // D Key is 68 & Right arrow is 39
      if (key.keyCode === 39) {
        pressedKeys["RIGHT"] = true
      }
    }
  })
  // PLAYER => KEY UP
  document.addEventListener("keyup", key => {
    if (UI.state == STATE.READY) {
      // W Key is 87 & Up arrow is 87
      if (key.keyCode === 38) {
        pressedKeys["UP"] = false
      }
      // S Key is 83 & Down arrow is 40
      if (key.keyCode === 40) {
        pressedKeys["DOWN"] = false
      }
      // A Key is 65 & Left arrow is 37
      if (key.keyCode === 37) {
        pressedKeys["LEFT"] = false
      }
      // D Key is 68 & Right arrow is 39
      if (key.keyCode === 39) {
        pressedKeys["RIGHT"] = false
      }
    }
  })

  onMount(async () => {
    console.log("MOUNTING...")
    // ___ Give the local user a UUID
    localUserUUID.set(nanoid())

    let playerObject = {
      uuid: $localUserUUID,
      name: "",
      shape: "",
      onboarded: false,
    }

    playerObject.shape = "star"
    playerObject.onboarded = true
    initializeWorld(playerObject)
    animationLoop()
    configureAuthClient()
  })
</script>

<!-- MENUBAR -->
<Menubar />

<!-- GAME WORLD -->
<div
  class="viewport"
  bind:this={viewportElement}
  class:blurred={UI.state == STATE.ONBOARDING}
>
  <!-- FIELD -->
  <div
    class="map"
    id="map"
    bind:this={mapElement}
    style={mainAreaStyles}
    in:fade
    on:click={e => {
      // console.log(e.target.id)
      if (e.target.id === "map") {
        moveTo(e.offsetX - 15, e.offsetY - 15, false)
      }
    }}
  >
    <!-- PLAYERS -->
    <!-- <Portals {portals} /> -->

    <!-- PLAYERS -->
    <Players players={$players} />
    <!-- TARGET -->
    {#if $showTarget}
      <Target x={$targetX} y={$targetY} />
    {/if}
  </div>
</div>

<!-- CAPTION BOX -->
{#if UI.state == STATE.READY}
  <Caption
    {captions}
    on:room={e => {
      // console.log(e)
      captions = []
      goToRoom(e.detail.roomId)
    }}
  />
{/if}

<!-- AMBIENT AUDIO -->
{#if soundFile}
  <AmbientAudio {soundFile} />
{/if}

<!-- LIVE STREAM -->
{#if streamUrl}
  <StreamPlayer {streamUrl} />
{/if}

<!-- CHAT-->
{#if showChat}
  <Chat
    chatMessages={chatMessages.filter(m => m.room === $currentArea)}
    on:submit={submitChat}
  />
{/if}

<!-- ONBOARDING -->
{#if UI.state == STATE.ONBOARDING}
  <Onboarding
    on:onboard={e => {
      onboardUser(e.detail.username, e.detail.shape)
    }}
  />
{/if}

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

<!-- AUTH TEST BOX -->
{#if UI.state == STATE.READY}
  <AuthenticationBox />
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

  .map {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(205, 205, 205, 1);
    cursor: crosshair;
    background-size: 100px;
  }

  // .screening-room {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   margin-left: -250px;
  //   margin-top: -250px;
  //   height: 500px;
  //   width: 500px;
  //   background: red;
  //   cursor: crosshair;
  //   // position: relative;
  // }

  // .exhibition-room {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   margin-left: -250px;
  //   margin-top: -250px;
  //   height: 500px;
  //   width: 500px;
  //   background: green;
  //   cursor: crosshair;
  //   // position: relative;
  // }

  // .meeting-room {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   margin-left: -250px;
  //   margin-top: -250px;
  //   height: 500px;
  //   width: 500px;
  //   background: yellow;
  //   cursor: crosshair;
  // }

  // .door {
  //   position: absolute;
  //   width: 120px;
  //   pointer-events: none;

  //   &.meeting {
  //     left: 800px;
  //     top: 900px;
  //   }

  //   &.exhibition {
  //     left: 950px;
  //     top: 900px;
  //   }

  //   &.screening {
  //     left: 1100px;
  //     top: 900px;
  //   }

  //   &.team {
  //     left: 700px;
  //     top: 1050px;
  //     transform: rotate(-90deg);
  //   }

  //   &.field {
  //     right: 30px;
  //     top: 30px;
  //   }
  // }

  // .zone {
  //   position: absolute;
  //   top: 1200px;
  //   left: 1100px;
  //   width: 220px;
  //   height: 80px;
  //   border-radius: 50%;
  //   border: 1px dashed black;
  //   pointer-events: none;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   background: transparent;
  //   transition: background 0.5s $transition;

  //   .zone-name {
  //     text-align: center;
  //     font-size: $FONT_SIZE_SMALL;
  //     opacity: 1;
  //     transition: opacity 0.5s ease-out;
  //   }

  //   &.active {
  //     background: yellow;
  //   }

  //   &:hover {
  //     .zone-name {
  //       opacity: 1;
  //     }
  //   }
  // }

  // .puddle {
  //   position: absolute;
  //   top: 1350px;
  //   left: 400px;
  //   width: 400px;
  //   height: 160px;
  //   border-radius: 50%;
  //   border: 1px dashed black;
  //   pointer-events: none;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   background: transparent;
  //   transition: background 0.5s $transition;

  //   .zone-name {
  //     text-align: center;
  //     font-size: $FONT_SIZE_SMALL;
  //     opacity: 1;
  //     transition: opacity 0.5s ease-out;
  //   }

  //   &.active {
  //     background: rgb(222, 255, 239);
  //   }

  //   &:hover {
  //     .zone-name {
  //       opacity: 1;
  //     }
  //   }
  // }
</style>
