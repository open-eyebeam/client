<script>
  // # # # # # # # # # # # # #
  //
  //  WORLD
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte"
  import * as Colyseus from "colyseus.js"
  import get from "lodash/get"
  import sample from "lodash/sample"
  import { fade } from "svelte/transition"
  import { quartOut } from "svelte/easing"
  import { urlFor, loadData, client } from "./sanity.js"
  import { links, navigate } from "svelte-routing"
  import { Howl } from "howler"
  import MediaQuery from "svelte-media-query"
  import Cookies from "js-cookie"

  // *** COMPONENTS
  import LoadingScreen from "./overlays/LoadingScreen.svelte"
  import Error from "./overlays/Error.svelte"
  import Reconnection from "./overlays/Reconnection.svelte"
  // *** NEW COMPONENTS
  import Players from "./Players.svelte"
  import Menubar from "./Menubar.svelte"
  import Target from "./TargetMarker.svelte"
  import Caption from "./Caption.svelte"
  import RoomDialog from "./RoomDialog.svelte"
  import EyebeamLogo from "./EyebeamLogo.svelte"
  import Onboarding from "./Onboarding.svelte"

  // *** GLOBAL
  import {
    nanoid,
    isOverlapping,
    MAP,
    REVERSE_HEX_MAP,
    QUERY,
    TEXT_ROOMS,
    GAME_SERVER_URL,
  } from "./global.js"

  // *** STORES
  import {
    localUserUUID,
    localUserSessionID,
    localUserName,
    // localUserAuthenticated,
    // authenticatedUserInformation,
    globalSettings,
    currentArea,
    currentAreaObject,
    currentTextRoom,
    currentAudioRoom,
    currentVideoRoom,
    globalUserList,
  } from "./stores.js"

  // *** PROPS
  export let params = false

  // *** VARIABLES
  let activeContentClosed = false
  // let supportStreamClosed = false
  let audioChatActive = false
  // let intentToPickUp = false
  let inAudioZone = false
  let chatMessages = []
  let moveQ = []
  let reconnectionAttempts = 0
  let disconnectionCode = 0
  let currentStreamEvent = false
  let currentStreamUrl = false
  // let supportStreamUrl = false

  // ___ Get data from Sanity CMS
  const graphicsSettings = loadData(QUERY.GRAPHICS_SETTINGS).catch(err => {
    console.log(err)
  })

  loadData(QUERY.GLOBAL_SETTINGS)
    .then(gS => {
      globalSettings.set(gS)
    })
    .catch(err => {
      console.log(err)
    })

  let activeStreams = loadData(QUERY.ACTIVE_STREAMS)
    .catch(err => {
      console.log(err)
    })
    .then(activeStreams => {
      currentStreamEvent = activeStreams.mainStreamEvent
      currentStreamUrl = activeStreams.mainStream
      // supportStreamUrl = activeStreams.supportStream
    })

  // __ Listen for changes to the active streams post
  client.listen(QUERY.ACTIVE_STREAMS).subscribe(update => {
    currentStreamUrl = false
    currentStreamEvent = false
    // supportStreamUrl = false
    setTimeout(() => {
      activeStreams = loadData(QUERY.ACTIVE_STREAMS)
        .then(aS => {
          if (aS.mainStream) {
            currentStreamEvent = aS.mainStreamEvent
            currentStreamUrl = aS.mainStream
            // supportStreamUrl = activeStreams.supportStream
            activeContentClosed = false
            // supportStreamClosed = false
          } else {
            currentStreamUrl = false
            currentStreamEvent = false
            // supportStreamUrl = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    }, 1000)
  })

  // ___ Set overarching state of the UI
  const STATE = {
    ERROR: 0,
    READY: 1,
    LOADING: 2,
    DISCONNECTED: 3,
    ONBOARDING: 4,
  }

  const UI = { state: STATE.LOADING, errorMessage: false }

  const setUIState = (newState, errorMessage = false) => {
    console.log("NEW STATE", newState)
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

  // __ Connect to Colyseus gameserver
  const gameClient = new Colyseus.Client(GAME_SERVER_URL)

  // *** GLOBAL FUNCTIONS
  let teleportTo = () => {}

  const checkDoorOverlap = () => {
    const avatarElement = document.getElementById($localUserUUID)
    if (avatarElement) {
      if (
        meetingDoorElement &&
        isOverlapping(avatarElement, meetingDoorElement)
      ) {
        showRoomDialog = true
        roomDialogText = "Enter meeting room?"
        roomId = "meeting"
        // currentArea.set("meeting")
        return
      }
      if (
        screeningDoorElement &&
        isOverlapping(avatarElement, screeningDoorElement)
      ) {
        showRoomDialog = true
        roomDialogText = "Enter screening room?"
        roomId = "screening"
        return
      }
      if (
        exhibitionDoorElement &&
        isOverlapping(avatarElement, exhibitionDoorElement)
      ) {
        showRoomDialog = true
        roomDialogText = "Enter exhibition room?"
        roomId = "exhibition"
        return
      }
      if (fieldDoorElement && isOverlapping(avatarElement, fieldDoorElement)) {
        showRoomDialog = true
        roomDialogText = "Return to the Field?"
        roomId = "field"
        return
      }
      showRoomDialog = false
    }
  }

  const animationLoop = () => {
    const step = timestamp => {
      // console.log("___ FRAME", timestamp)
      // console.log("moveQ", moveQ)

      // __ Keyboard navigation
      if (Object.values(pressedKeys).some(k => k)) {
        // console.log("KEY PRESSED", pressedKeys)
        if (pressedKeys["UP"]) {
          // console.log("UP")
          if (players[$localUserUUID].y > 0) {
            players[$localUserUUID].y -= 2
          }
        }
        if (pressedKeys["DOWN"]) {
          // console.log("DOWN")
          if (players[$localUserUUID].y < 500) {
            players[$localUserUUID].y += 2
          }
        }
        if (pressedKeys["LEFT"]) {
          // console.log("LEFT")
          if (players[$localUserUUID].x > 0) {
            players[$localUserUUID].x -= 2
          }
        }
        if (pressedKeys["RIGHT"]) {
          // console.log("RIGHT")
          if (players[$localUserUUID].x < 500) {
            players[$localUserUUID].x += 2
          }
        }
        moveTo(players[$localUserUUID].x, players[$localUserUUID].y, true)
        checkDoorOverlap()
      }
      if (releasedKey) {
        // console.log("KEY released")
        releasedKey = false
        // moveTo(players[$localUserUUID].x, players[$localUserUUID].y, true)
      }

      for (let key in moveQ) {
        // console.log("key", key)
        if (players[key]) {
          if (moveQ[key].length > 0) {
            // Get next step, adjusting for delta
            // moveQ[key].splice(0, 1)
            let step = moveQ[key].shift()
            players[key].x = step.x
            players[key].y = step.y
            if (players[key].self) {
              checkDoorOverlap()
            }
          } else {
            // Destination reached
            if (players[key].self) {
              targetX = 0
              targetY = 0
              showTarget = false
              checkDoorOverlap()
            }
            delete moveQ[key]
          }
        } else {
          delete moveQ[key]
        }
      }
      window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  }

  let players = {}
  let moveTo = {}
  let goToRoom = {}
  let onboardUser = {}

  let showTarget = false
  let targetX = 0
  let targetY = 0

  let meetingDoorElement = {}
  let screeningDoorElement = {}
  let exhibitionDoorElement = {}
  let fieldDoorElement = {}
  let showRoomDialog = false
  let roomDialogText = ""
  let roomId = "field"
  let baseLevel = true

  const pressedKeys = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false,
  }
  let releasedKey = false

  $: console.log("$currentArea", $currentArea)

  onMount(async () => {
    // ___ Give the local user a UUID
    localUserUUID.set(nanoid())
    localUserName.set("unknown")

    const usernameCookie = Cookies.get("open-eyebeam__name")
    console.log("usernameCookie", usernameCookie)
    if (!usernameCookie) {
      // ___ Prompt user to enter name
      setUIState(STATE.ONBOARDING)
    } else {
      // ___ Set username from cookie
      localUserName.set(usernameCookie)
    }

    const userShapeCookie = Cookies.get("open-eyebeam__shape")
    console.log("userShapeCookie", userShapeCookie)

    let playerObject = {
      uuid: $localUserUUID,
      name: $localUserName,
      shape: userShapeCookie ? userShapeCookie : "square",
      onboarded: !usernameCookie ? false : true,
    }

    console.log("playerObject", playerObject)

    // __ Join game room
    gameClient
      .joinOrCreate("game", playerObject)
      .then(gameRoom => {
        // ******
        // PLAYER
        // ******

        // Start animation loop
        animationLoop()

        // PLAYER => REMOVE
        gameRoom.state.players.onRemove = (player, sessionId) => {
          console.log("__REMOVE", player)
          delete players[player.uuid]
          players = players
        }

        // PLAYER => ADD
        gameRoom.state.players.onAdd = (player, sessionId) => {
          console.log("__ADD", player)

          players[player.uuid] = {
            name: player.name,
            x: player.x,
            y: player.y,
            room: "field",
            self: player.uuid === $localUserUUID,
          }

          if (player.uuid === $localUserUUID) {
            currentArea.set("field")
            if (player.onboarded) {
              setUIState(STATE.READY)
            }
          }

          // PLAYER => CHANGE
          player.onChange = changes => {
            console.log("__CHANGE", player)

            // IGNORE LOCAL KEYBOARD NAVIGATION
            if (
              player.uuid === $localUserUUID &&
              player.path.keyboardNavigation
            ) {
              return
            }

            // ONBOARDING COMPLETED
            if (player.onboarded && !players[player.uuid].onboarded) {
              console.log("ONBOARDING COMPLETED")
              console.log(player)
              players[player.uuid].onboarded = true
              players[player.uuid].name = player.name
              players[player.uuid].shape = player.shape
            }

            // ROOM CHANGE
            if (player.room !== players[player.uuid].room) {
              console.log("CHANGE ROOM", player.uuid, player.room)
              players[player.uuid].room = player.room
              if (player.uuid === $localUserUUID) {
                currentArea.set(player.room)
                baseLevel = false
                showRoomDialog = false
                players[$localUserUUID].x = player.x
                players[$localUserUUID].y = player.y
                players[$localUserUUID].room = player.room
              }
              return
            }

            if (player.path.waypoints.length > 0) {
              if (player.uuid === $localUserUUID && player.onboarded) {
                targetX = player.x
                targetY = player.y
                showTarget = true
              }
              // __ Normal movement
              moveQ[player.uuid] = player.path.waypoints.filter(
                (_, i) => (i + 1) % 5
              )
            }
          }
        }

        // PLAYER => BANNED
        gameRoom.onMessage("banned", message => {
          setUIState(STATE.ERROR, "You have been banned")
        })

        moveTo = (x, y, keyboardNavigation) => {
          delete moveQ[$localUserUUID]
          showTarget = false
          if (keyboardNavigation) {
            gameRoom.send("go", {
              x: x,
              y: y,
              keyboardNavigation: true,
            })
          } else {
            gameRoom.send("go", {
              x: x,
              y: y,
              originX: players[$localUserUUID].x,
              originY: players[$localUserUUID].y,
              keyboardNavigation: false,
            })
          }
        }

        onboardUser = (username, shape) => {
          console.log("username", username)
          console.log("shape", shape)
          gameRoom.send("onboard", {
            username: username,
            shape: shape,
          })
          setUIState(STATE.READY)
        }

        goToRoom = roomId => {
          console.log(roomId)
          gameRoom.send("changeRoom", {
            id: roomId,
          })
        }

        // *******
        // MESSAGE
        // *******

        // ******************************
        // CLIENT LEFT / WAS DISCONNECTED
        // ******************************
        gameRoom.onLeave(code => {
          const exitMsg = "Disconnected from server. Code: " + code
          // console.log(exitMsg);
          // __ Show notification of disconnection
          setUIState(STATE.DISCONNECTED)
          disconnectionCode = code
          reconnectionAttempts = 1
          // TODO: Try to reconnect
          const reconnect = i => {
            console.log(
              "Trying to reconnect user:",
              $localUserSessionID,
              "....",
              i
            )
            gameClient
              .reconnect("game", $localUserSessionID)
              .then(room => {
                // __ Successfully reconnected
                setUIState(STATE.READY)
              })
              .catch(e => {
                console.error("join error", e)
              })
            //   setInterval(() => {
            //   reconnectionAttempts++
            // }, 5000)
          }
          reconnect(1)
        })

        // ************************
        // GENERAL ERROR HANDLING
        // ************************
        gameRoom.onError((code, message) => {
          setUIState(STATE.ERROR, message)
          console.error("Gameserver error:", message)
        })
      })
      .catch(e => {
        console.dir(e)
        if (e.code == 4215) {
          setUIState(STATE.ERROR, "You have been banned")
        } else {
          setUIState(STATE.ERROR, "FAILED TO CONNECT TO GAMESERVER")
        }
      })

    // PLAYER => KEY DOWN
    document.addEventListener("keydown", key => {
      if (UI.state == STATE.READY) {
        console.log(key)
        // W Key is 87 & Up arrow is 87
        if (key.keyCode === 87 || key.keyCode === 38) {
          console.log("__pressed: UP")
          pressedKeys["UP"] = true
        }
        // S Key is 83 & Down arrow is 40
        if (key.keyCode === 83 || key.keyCode === 40) {
          // console.log("__pressed: DOWN")
          pressedKeys["DOWN"] = true
        }
        // A Key is 65 & Left arrow is 37
        if (key.keyCode === 65 || key.keyCode === 37) {
          // console.log("__pressed: LEFT")
          pressedKeys["LEFT"] = true
        }
        // D Key is 68 & Right arrow is 39
        if (key.keyCode === 68 || key.keyCode === 39) {
          // console.log("__pressed: RIGHT")
          pressedKeys["RIGHT"] = true
        }
      }
    })

    document.addEventListener("keyup", key => {
      if (UI.state == STATE.READY) {
        console.log("keyup")
        // W Key is 87 & Up arrow is 87
        if (key.keyCode === 87 || key.keyCode === 38) {
          // console.log("__released: UP")
          pressedKeys["UP"] = false
          releasedKey = true
        }
        // S Key is 83 & Down arrow is 40
        if (key.keyCode === 83 || key.keyCode === 40) {
          // console.log("__released: DOWN")
          pressedKeys["DOWN"] = false
          releasedKey = true
        }
        // A Key is 65 & Left arrow is 37
        if (key.keyCode === 65 || key.keyCode === 37) {
          // console.log("__released: LEFT")
          pressedKeys["LEFT"] = false
          releasedKey = true
        }
        // D Key is 68 & Right arrow is 39
        if (key.keyCode === 68 || key.keyCode === 39) {
          // console.log("__released: RIGHT")
          pressedKeys["RIGHT"] = false
          releasedKey = true
        }
      }
    })
  })
</script>

<Menubar />

<!-- GAME WORLD -->
<div class="viewport" class:blurred={UI.state == STATE.ONBOARDING}>
  <!-- FIELD -->
  {#if baseLevel && $currentArea === "field"}
    <div
      class="map"
      id="map"
      in:fade
      on:click={e => {
        // console.log(e)
        if (e.target.id === "map") {
          moveTo(e.offsetX - 15, e.offsetY - 15, false)
        }
      }}
    >
      <!-- DOORS -->
      <div class="door meeting" bind:this={meetingDoorElement}>
        <EyebeamLogo />
      </div>
      <div class="door screening" bind:this={screeningDoorElement}>
        <EyebeamLogo />
      </div>
      <div class="door exhibition" bind:this={exhibitionDoorElement}>
        <EyebeamLogo />
      </div>
      <!-- PLAYERS -->
      <Players {players} />
      <!-- TARGET -->
      {#if showTarget}
        <Target x={targetX} y={targetY} />
      {/if}
    </div>
  {/if}

  <!-- EXHIBITION -->
  {#if $currentArea === "exhibition"}
    <div
      in:fade={{ delay: 1000 }}
      class="exhibition-room"
      id="exhibition"
      on:click={e => {
        if (e.target.id === "exhibition") {
          moveTo(e.offsetX - 15, e.offsetY - 15, false)
        }
      }}
    >
      <!-- DOORS -->
      <div class="door field" bind:this={fieldDoorElement}>
        <EyebeamLogo />
      </div>
      <!-- PLAYERS -->
      <Players {players} />
      <!-- TARGET -->
      {#if showTarget}
        <Target x={targetX} y={targetY} />
      {/if}
    </div>
  {/if}

  <!-- SCREENING -->
  {#if $currentArea === "screening"}
    <div
      class="screening-room"
      id="screening"
      in:fade={{ delay: 1000 }}
      on:click={e => {
        if (e.target.id === "screening") {
          moveTo(e.offsetX - 15, e.offsetY - 15, false)
        }
      }}
    >
      <!-- DOORS -->
      <div class="door field" bind:this={fieldDoorElement}>
        <EyebeamLogo />
      </div>
      <!-- PLAYERS -->
      <Players {players} />
      <!-- TARGET -->
      {#if showTarget}
        <Target x={targetX} y={targetY} />
      {/if}
    </div>
  {/if}

  <!-- MEETING -->
  {#if $currentArea === "meeting"}
    <div
      class="meeting-room"
      id="meeting"
      in:fade={{ delay: 1000 }}
      on:click={e => {
        if (e.target.id === "meeting") {
          moveTo(e.offsetX - 15, e.offsetY - 15, false)
        }
      }}
    >
      <!-- DOORS -->
      <div class="door field" bind:this={fieldDoorElement}>
        <EyebeamLogo />
      </div>
      <!-- PLAYERS -->
      <Players {players} />
      <!-- TARGET -->
      {#if showTarget}
        <Target x={targetX} y={targetY} />
      {/if}
    </div>
  {/if}
</div>

<!-- CAPTION BOX -->
{#if !showRoomDialog && UI.state == STATE.READY}
  <Caption />
{/if}

<!-- ENTER ROOM DIALOG -->
{#if showRoomDialog}
  <RoomDialog
    text={roomDialogText}
    {roomId}
    on:room={e => {
      console.log(e)
      goToRoom(e.detail.roomId)
    }}
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
    background: rgb(30, 30, 30);

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
    margin-left: -250px;
    margin-top: -250px;
    height: 500px;
    width: 500px;
    background: rgba(205, 205, 205, 1);
    cursor: crosshair;
    // position: relative;
  }

  .screening-room {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -250px;
    height: 500px;
    width: 500px;
    background: red;
    cursor: crosshair;
    // position: relative;
  }

  .exhibition-room {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -250px;
    height: 500px;
    width: 500px;
    background: green;
    cursor: crosshair;
    // position: relative;
  }

  .meeting-room {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -250px;
    height: 500px;
    width: 500px;
    background: yellow;
    cursor: crosshair;
    // position: relative;
  }

  .door {
    position: absolute;
    width: 120px;
    // height: 50px;
    // border-radius: 50%;
    // border: 1px dashed black;
    pointer-events: none;

    &.meeting {
      left: 190px;
      top: 100px;
    }

    &.exhibition {
      left: 350px;
      top: 100px;
    }

    &.screening {
      left: 30px;
      top: 100px;
    }

    &.field {
      right: 30px;
      top: 30px;
    }
  }
</style>
