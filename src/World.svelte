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
  import { urlFor, loadData, client } from "./sanity.js"
  import { links, navigate } from "svelte-routing"
  import MediaQuery from "svelte-media-query"
  import Cookies from "js-cookie"
  import createAuth0Client from "@auth0/auth0-spa-js"

  // *** COMPONENTS
  import LoadingScreen from "./overlays/LoadingScreen.svelte"
  import Error from "./overlays/Error.svelte"
  import Reconnection from "./overlays/Reconnection.svelte"
  // *** NEW COMPONENTS
  import Players from "./Players.svelte"
  import Menubar from "./Menubar.svelte"
  import Target from "./TargetMarker.svelte"
  import Caption from "./Caption.svelte"
  import EyebeamLogo from "./EyebeamLogo.svelte"
  import Onboarding from "./Onboarding.svelte"
  import AmbientAudio from "./AmbientAudio.svelte"
  import StreamPlayer from "./StreamPlayer.svelte"
  import Chat from "./Chat.svelte"
  import Objects from "./Objects.svelte"

  // *** GLOBAL
  import { nanoid, isOverlapping, QUERY, GAME_SERVER_URL } from "./global.js"

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
  } from "./stores.js"

  // $: console.log("$maxDimension", $maxDimension)

  // *** PROPS
  export let params = false

  // *** VARIABLES
  let moveQ = []
  let reconnectionAttempts = 0
  let disconnectionCode = 0

  // AUTH0
  let auth0 = null
  let isAuthenticated = false
  const domain = "eyebeam.us.auth0.com"
  const clientId = "pcL6xHzv2ni7VZ8kPAfcOr8tc4QffcRN"
  const DISCORD_PREFIX = "oauth2|discord|"

  const configureClient = async () => {
    auth0 = await createAuth0Client({
      domain: domain,
      client_id: clientId,
      audience: "https://api/sanity",
    })
  }

  const login = async () => {
    await auth0.loginWithRedirect({
      redirect_uri: window.location.origin,
    })
  }

  const logout = () => {
    auth0.logout({
      returnTo: window.location.origin,
    })
  }

  // ___ Get data from Sanity CMS
  const graphicsSettings = loadData(QUERY.GRAPHICS_SETTINGS).catch(err => {
    console.log(err)
  })

  // ___ Get data from Sanity CMS
  let rooms = []
  loadData(QUERY.ROOMS)
    .catch(err => {
      console.log(err)
    })
    .then(rs => {
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

  let testZoneActive = false
  let puddleZoneActive = false

  const checkDoorOverlap = () => {
    const avatarElement = document.getElementById($localUserUUID)
    if (avatarElement) {
      if (
        meetingDoorElement &&
        isOverlapping(avatarElement, meetingDoorElement)
      ) {
        if (captions.findIndex(c => c.roomId === "meeting") === -1) {
          captions = []
          captions.push({
            text: "Enter meeting room?",
            roomId: "meeting",
            type: "room",
          })
          captions = captions
        }
        return
      }
      if (
        screeningDoorElement &&
        isOverlapping(avatarElement, screeningDoorElement)
      ) {
        if (captions.findIndex(c => c.roomId === "screening") === -1) {
          captions = []
          captions.push({
            text: "Enter screening room?",
            roomId: "screening",
            type: "room",
          })
          captions = captions
        }
        return
      }
      if (
        exhibitionDoorElement &&
        isOverlapping(avatarElement, exhibitionDoorElement)
      ) {
        if (captions.findIndex(c => c.roomId === "exhibition") === -1) {
          captions = []
          captions.push({
            text: "Enter exhibition room?",
            roomId: "exhibition",
            type: "room",
          })
          captions = captions
        }
        return
      }
      if (fieldDoorElement && isOverlapping(avatarElement, fieldDoorElement)) {
        if (captions.findIndex(c => c.roomId === "field") === -1) {
          captions = []
          captions.push({
            text: "Return to the Field?",
            roomId: "field",
            type: "room",
          })
          captions = captions
        }
        return
      }
      if (testZoneElement && isOverlapping(avatarElement, testZoneElement)) {
        if (captions.findIndex(c => c.roomId === "test-zone") === -1) {
          captions = []
          captions.push({
            text: "You entered the test zone.",
            roomId: "test-zone",
            type: "introduction",
          })
          captions = captions
        }
        testZoneActive = true
        return
      }
      if (
        puddleZoneElement &&
        isOverlapping(avatarElement, puddleZoneElement)
      ) {
        if (captions.findIndex(c => c.roomId === "test-zone") === -1) {
          captions = []
          captions.push({
            text: "You entered the puddle.",
            roomId: "puddle",
            type: "introduction",
          })
          captions = captions
        }
        puddleZoneActive = true
        return
      }
      if (teamDoorElement && isOverlapping(avatarElement, teamDoorElement)) {
        if (captions.findIndex(c => c.roomId === "field") === -1) {
          captions = []
          captions.push({
            text: "Enter team room?",
            roomId: "team",
            type: "room",
          })
          captions = captions
        }
        return
      }
      testZoneActive = false
      puddleZoneActive = false
      captions = []
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
      console.log("deltaJump", deltaJump)
    }
  }

  document.addEventListener(visibilityChange, handleVisibilityChange, false)

  const animationLoop = () => {
    const step = timestamp => {
      // console.log("___ FRAME", timestamp)
      // console.log("moveQ", moveQ)

      // __ Keyboard navigation
      if (players[$localUserUUID]) {
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
            if (players[$localUserUUID].y < $maxDimension) {
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
            if (players[$localUserUUID].x < $maxDimension) {
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
      }

      for (let key in moveQ) {
        if (players[key]) {
          if (moveQ[key].length > 0) {
            if (moveQ[key].length - deltaJump < 0) {
              // User reached destination while the window was out of focus
              // Move to final step and clear users's move queue
              let step = moveQ[key][moveQ[key].length - 1]
              players[key].x = step.x
              players[key].y = step.y
              delete moveQ[key]
              if (players[key].self) {
                showTarget = false
                checkDoorOverlap()
              }
            } else {
              // Get next step, adjusting for delta
              moveQ[key].splice(0, deltaJump - 1)
              let step = moveQ[key].shift()
              players[key].x = step.x
              players[key].y = step.y
              if (players[key].self) {
                checkDoorOverlap()
              }
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
      deltaJump = 0
      window.requestAnimationFrame(step)
    }
    // !!! TODO: CENTER VIEW ON PLAYER
    window.requestAnimationFrame(step)
  }

  let players = {}
  let moveTo = {}
  let goToRoom = {}
  let onboardUser = {}

  let showTarget = false
  let targetX = 0
  let targetY = 0

  let viewportElement = {}
  let mapElement = {}

  let meetingDoorElement = {}
  let screeningDoorElement = {}
  let exhibitionDoorElement = {}
  let testZoneElement = {}
  let puddleZoneElement = {}
  let fieldDoorElement = false
  let teamDoorElement = false

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

  const addIntroCaption = t => {
    captions = []
    // setTimeout(() => {
    captions.push({ text: t, type: "introduction" })
    captions = captions
  }

  $: {
    // console.log($currentArea)
    // console.log(rooms)
    if ($currentArea) {
      // console.log("–_—_—_ => Area changed")
      const area = rooms.find(r => r.slug.current === $currentArea)
      // console.log(area)
      if (area) {
        // TOGGLE CHAT
        showChat = area.chat
        // CHANGE CAPTION
        if (area.introduction) {
          addIntroCaption(area.introduction)
        }
        // CHANGE SOUND
        if (area.soundFile && area.soundFile.asset) {
          soundFile = area.soundFile
        } else {
          soundFile = false
        }
        // CHANGE STREAM
        if (area.stream) {
          streamUrl = area.stream
        } else {
          streamUrl = false
        }
      }
    }
  }

  const initializeWorld = playerObject => {
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
          // console.log("__REMOVE", player)
          delete players[player.uuid]
          players = players
        }

        // PLAYER => ADD
        gameRoom.state.players.onAdd = (player, sessionId) => {
          // console.log("__ADD", player)

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
            // console.log("__CHANGE", player)

            // ONBOARDING COMPLETED
            if (player.onboarded && !players[player.uuid].onboarded) {
              // console.log("ONBOARDING COMPLETED")
              // console.log(player)
              players[player.uuid].onboarded = true
              players[player.uuid].name = player.name
              players[player.uuid].shape = player.shape

              if (player.uuid === $localUserUUID && !isAuthenticated) {
                Cookies.set("open-eyebeam__shape", player.shape)
                Cookies.set("open-eyebeam__name", player.name)
              }
              // !!! Ignore movements on load
              return
            }

            // ROOM CHANGE
            if (player.room !== players[player.uuid].room) {
              // console.log("CHANGE ROOM", player.uuid, player.room)
              // console.log(player)

              if (player.uuid === $localUserUUID) {
                // currentArea.set(player.room)
                delete players[$localUserUUID]

                let tl = gsap.timeline() //create the timeline
                tl.to(viewportElement, 1, {
                  css: { backgroundColor: "rgb(226, 229, 223)" },
                })
                tl.to(viewportElement, 1, {
                  css: { backgroundColor: "rgb(14, 13, 13)" },
                })

                let tl2 = gsap.timeline() //create the timeline
                tl2.to(mapElement, 1, {
                  css: { backgroundColor: "rgb(14, 13, 13)" },
                })
                tl2.to(mapElement, 1, {
                  css: { backgroundColor: "rgb(205 205 205)" },
                })

                tl2.play()
                tl.play()

                setTimeout(() => {
                  currentArea.set(player.room)
                  players[$localUserUUID] = {
                    name: player.name,
                    x: player.x,
                    y: player.y,
                    room: player.room,
                    shape: player.shape,
                    self: true,
                    onboarded: true,
                  }
                }, 1000)

                // tl.eventCallback("onComplete", () => {

                // })
              } else {
                players[player.uuid].x = player.x
                players[player.uuid].y = player.y
                players[player.uuid].room = player.room
              }

              return
            }

            // IGNORE LOCAL KEYBOARD NAVIGATION
            if (
              player.uuid === $localUserUUID &&
              player.path.keyboardNavigation
            ) {
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
          // console.log(x, y)
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
          // console.log("username", username)
          // console.log("shape", shape)
          gameRoom.send("onboard", {
            username: username,
            shape: shape,
          })
          setUIState(STATE.READY)
        }

        goToRoom = roomId => {
          // console.log(roomId)
          gameRoom.send("changeRoom", {
            id: roomId,
          })
        }

        // *******
        // MESSAGE
        // *******

        // MESSAGE => ADD
        gameRoom.state.messages.onAdd = message => {
          chatMessages = [...chatMessages, message]
        }

        // MESSAGE => REMOVE
        gameRoom.onMessage("nukeMessage", msgIdToRemove => {
          const itemIndex = chatMessages.findIndex(
            m => m.msgId === msgIdToRemove
          )
          chatMessages.splice(itemIndex, 1)
          chatMessages = chatMessages
        })

        // MESSAGE => SUBMIT
        submitChat = event => {
          try {
            gameRoom.send("submitChatMessage", {
              msgId: nanoid(),
              uuid: $localUserUUID,
              name: players[$localUserUUID].name,
              text: event.detail.text,
              room: $currentArea,
            })
          } catch (err) {
            setUIState(STATE.ERROR, err)
            console.dir(err)
          }
        }

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
  }

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
    console.log("playerObject", playerObject)

    await configureClient()
    isAuthenticated = await auth0.isAuthenticated()

    // IF: User is logged in => Set name and shape and state = READY
    if (isAuthenticated) {
      console.log("___ (1) User is authenticated")
      profile.set(await auth0.getUser())
      let sanityProfile = await loadData(
        "*[_type == 'user' && _id == $sub][0]",
        { sub: $profile.sub.replace(DISCORD_PREFIX, "") }
      )
      console.log(sanityProfile)
      profileMeta.set(sanityProfile)
      localUserName.set($profileMeta.name)
      playerObject.name = $profileMeta.name
      playerObject.shape = "star"
      playerObject.onboarded = true
      initializeWorld(playerObject)
      return
    }

    // IF: User is currently logging in => Set name and shape and state = READY
    // Check for the code and state parameters
    const query = window.location.search
    if (query.includes("code=") && query.includes("state=")) {
      console.log("___ (2) User just logged in ")
      // // Process the login state
      await auth0.handleRedirectCallback()
      isAuthenticated = await auth0.isAuthenticated()
      // // Use replaceState to redirect the user away and remove the querystring parameters
      window.history.replaceState({}, document.title, "/")
      if (isAuthenticated) {
        // let prof = await auth0.getUser()
        // console.log("prof", prof)
        profile.set(await auth0.getUser())
        let sanityProfile = await loadData(
          "*[_type == 'user' && _id == $sub][0]",
          { sub: $profile.sub.replace(DISCORD_PREFIX, "") }
        )
        console.log(sanityProfile)
        profileMeta.set(sanityProfile)
        localUserName.set($profileMeta.name)
        playerObject.name = $profileMeta.name
        playerObject.shape = "star"
        playerObject.onboarded = true
        initializeWorld(playerObject)
        return
      }
    }

    // $: console.log("$profileMeta", $profileMeta)

    const usernameCookie = Cookies.get("open-eyebeam__name")
    console.log("usernameCookie", usernameCookie)
    const userShapeCookie = Cookies.get("open-eyebeam__shape")
    console.log("userShapeCookie", userShapeCookie)
    if (usernameCookie && userShapeCookie) {
      console.log("___ (3) Cookies are set")
      localUserName.set(usernameCookie)
      playerObject.name = usernameCookie
      playerObject.shape = userShapeCookie
      playerObject.onboarded = true
      initializeWorld(playerObject)
      return
    } else {
      console.log("___ (4) New user. Start onboarding...")
      setUIState(STATE.ONBOARDING)
      initializeWorld(playerObject)
      return
    }
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
    class:field={$currentArea === "field"}
    in:fade
    on:click={e => {
      // console.log(e.target.id)
      if (e.target.id === "map") {
        moveTo(e.offsetX - 15, e.offsetY - 15, false)
      }
    }}
  >
    {#if $currentArea === "field"}
      <!-- DOORS -->
      <div class="door meeting" in:fade bind:this={meetingDoorElement}>
        <EyebeamLogo />
      </div>
      <div class="door screening" in:fade bind:this={screeningDoorElement}>
        <EyebeamLogo />
      </div>
      <div class="door exhibition" in:fade bind:this={exhibitionDoorElement}>
        <EyebeamLogo />
      </div>
      {#if isAuthenticated}
        <div class="door team" in:fade bind:this={teamDoorElement}>
          <EyebeamLogo />
        </div>
      {/if}
      <!-- ZONES -->
      <div
        class="zone"
        class:active={testZoneActive}
        in:fade
        bind:this={testZoneElement}
      >
        <div class="zone-name">Test zone</div>
      </div>
      <!-- PUDDLE -->
      <div
        class="puddle"
        class:active={puddleZoneActive}
        in:fade
        bind:this={puddleZoneElement}
      >
        <div class="zone-name">Puddle</div>
      </div>
    {:else}
      <div class="door field" in:fade bind:this={fieldDoorElement}>
        <EyebeamLogo />
      </div>
    {/if}

    {#if $currentArea === "exhibition"}
      {#await objects then objects}
        <Objects {objects} />
      {/await}
    {/if}

    <!-- PLAYERS -->
    <Players {players} />
    <!-- TARGET -->
    {#if showTarget}
      <Target x={targetX} y={targetY} />
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

<!-- AMBIENT AUDIO -->
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
  <div
    class="auth-box"
    on:click={() => {
      if (!isAuthenticated) {
        login()
      } else {
        logout()
      }
    }}
  >
    {#if isAuthenticated}
      {#if $profileMeta.name}
        <div>
          {$profileMeta.name}
          {#if $profileMeta.roles && $profileMeta.roles.length > 0}
            {#each $profileMeta.roles as role}
              <span>({role}) </span>
            {/each}
          {/if}
        </div>
      {/if}
      <div>Log out</div>
    {:else}Login{/if}
  </div>
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
    margin-left: -250px;
    margin-top: -250px;
    height: 500px;
    width: 500px;
    background: rgba(205, 205, 205, 1);
    cursor: crosshair;
    // position: relative;

    &.field {
      margin-left: -1000px;
      margin-top: -1000px;
      height: 2000px;
      width: 2000px;
    }
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
  }

  .door {
    position: absolute;
    width: 120px;
    pointer-events: none;

    &.meeting {
      left: 800px;
      top: 900px;
    }

    &.exhibition {
      left: 950px;
      top: 900px;
    }

    &.screening {
      left: 1100px;
      top: 900px;
    }

    &.team {
      left: 700px;
      top: 1050px;
      transform: rotate(-90deg);
    }

    &.field {
      right: 30px;
      top: 30px;
    }
  }

  .zone {
    position: absolute;
    top: 1200px;
    left: 1100px;
    width: 220px;
    height: 80px;
    border-radius: 50%;
    border: 1px dashed black;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    transition: background 0.5s $transition;

    .zone-name {
      text-align: center;
      font-size: $FONT_SIZE_SMALL;
      opacity: 1;
      transition: opacity 0.5s ease-out;
    }

    &.active {
      background: yellow;
    }

    &:hover {
      .zone-name {
        opacity: 1;
      }
    }
  }

  .puddle {
    position: absolute;
    top: 1350px;
    left: 400px;
    width: 400px;
    height: 160px;
    border-radius: 50%;
    border: 1px dashed black;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    transition: background 0.5s $transition;

    .zone-name {
      text-align: center;
      font-size: $FONT_SIZE_SMALL;
      opacity: 1;
      transition: opacity 0.5s ease-out;
    }

    &.active {
      background: rgb(222, 255, 239);
    }

    &:hover {
      .zone-name {
        opacity: 1;
      }
    }
  }

  .auth-box {
    position: fixed;
    top: 50px;
    left: 30px;
    background: $COLOR_LIGHT;
    border: 1px solid $COLOR_DARK;
    padding: 5px;
    cursor: pointer;
    font-size: $FONT_SIZE_SMALL;

    &:hover {
      background: $COLOR_MID;
    }
  }
</style>
