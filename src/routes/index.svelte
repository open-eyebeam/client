<script>
  // * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  //  index.svelte =>
  //  The main view, rendering the game world.
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * *

  import { onMount } from "svelte"
  import get from "lodash/get.js"
  import has from "lodash/has.js"
  import Cookies from "js-cookie"

  // *** WORLD LAYERS
  import Room from "$lib/components/world-layers/Room.svelte"
  import Players from "$lib/components/world-layers/Players.svelte"
  import Objects from "$lib/components/world-layers/objects/Objects.svelte"
  import Zones from "$lib/components/world-layers/zones/Zones.svelte"
  import Portals from "$lib/components/world-layers/portals/Portals.svelte"

  import {
    connectToGameServer,
    players,
    chatMessages,
    goToRoom,
    submitChat,
  } from "$lib/modules/engine.js"
  import {
    configureAuthClient,
    profile,
    login,
    isAuthenticated,
  } from "$lib/modules/authentication.js"
  import {
    buildWorld,
    worldObject,
    loadAvatars,
    localPlayer,
    initializeStreamsHandler,
    streams,
  } from "$lib/modules/world.js"
  import {
    initializeKeyboardHandler,
    currentRoom,
    checkPortalOverlap,
    checkZoneOverlap,
    checkObjectOverlap,
    activeZone,
    roomIntent,
    objectIntent,
  } from "$lib/modules/movement.js"
  import {
    showLabels,
    playSound,
    activeArticle,
    trayOpen,
    uiState,
    STATE,
    transitionWorldIn,
    transitionWorldOut,
    focusPlayer,
    isPhone,
  } from "$lib/modules/ui.js"
  import {
    nanoid,
    getRandomInt,
    infoLogger,
    errorLogger,
  } from "$lib/modules/utilities.js"

  // *** VARIABLES
  let viewportElement = {}
  let avatars = []
  let newRoomIntroduction = false

  $: {
    if ($players[$localPlayer.uuid]) {
      // Listen to changes to the users movement and check for overlap
      if ($players[$localPlayer.uuid].x || $players[$localPlayer.uuid].x) {
        checkPortalOverlap()
        checkZoneOverlap()
        checkObjectOverlap()
      }
    }
  }

  const changeRoom = async id => {
    showLabels.set(false)
    await transitionWorldOut(viewportElement)
    console.log('world object: ', $worldObject)
    console.log('room id: ', id)

    const oldRoomId = $currentRoom._id
    const newRoom = $worldObject[id]
    currentRoom.set(newRoom)

    // Set the hash
    if ($worldObject[id].mainArea) {
      history.replaceState(null, null, " ")
    } else {
      history.replaceState(
        null,
        null,
        "#" + get($worldObject[id], "slug.current", "")
      )
    }

    // Provisional spawn point
    let targetX = getRandomInt(4, 6)
    let targetY = getRandomInt(4, 6)

    if (
      newRoom.portals &&
      newRoom.portals.find(p => p.targetArea._id === oldRoomId)
    ) {
      // Find a portal in the new room that leads from the old one
      const targetPortal = newRoom.portals.find(
        p => p.targetArea._id === oldRoomId
      )
      // Get a random spawn point around the portal
      while (true) {
        targetX = getRandomInt(targetPortal.x - 2, targetPortal.x + 2)
        targetY = getRandomInt(targetPortal.y - 2, targetPortal.y)
        if (
          // Don't spawn outside of the room
          targetX < 1 ||
          targetY < 1 ||
          targetX > newRoom.dimensions.width ||
          targetY > newRoom.dimensions.height ||
          // ... and don't spawn directly on top of the portal
          (targetX == targetPortal.x && targetX == targetPortal.x)
        ) {
          continue
        }
        // Leave the loop...
        break
      }
    }

    // Send to server...
    goToRoom({
      id: newRoom._id,
      x: targetX,
      y: targetY,
    })

    await transitionWorldIn(viewportElement)
    showLabels.set(true)
    if (has(newRoom, "introductionTexts")) {
      newRoomIntroduction = newRoom.introductionTexts
    } else {
      newRoomIntroduction = false
    }
  }

  const finalSetUp = async (name, avatar) => {
    // Construct the player object
    let playerObject = {
      uuid: $localPlayer.uuid,
      name: $profile && $profile.name ? $profile.name : name,
      shape: has($profile, "avatar._ref") ? $profile.avatar._ref : avatar,
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

    // Check if there is a hash in the URL
    if (window.location.hash) {
      const hash = window.location.hash.substring(1)
      // Find the room with the matching slug
      for (const [key, value] of Object.entries($worldObject)) {
        if (get($worldObject[key], "slug.current", "") === hash) {
          changeRoom(key)
          break
        }
      }
    }

    // Show introduction text
    if (has($currentRoom, "introductionTexts")) {
      newRoomIntroduction = $currentRoom.introductionTexts
    }
    infoLogger("✓ (7) Show main room introduction")

    // ... done!
    infoLogger("__ => App loaded")
    // Cookies.set("open-eyebeam-name", name)
    // Cookies.set("open-eyebeam-avatar", avatar)
    uiState.set(STATE.READY)
    // Focus on the player's avatar for 3 seconds
    focusPlayer.set(false)
    isPhone.set(window.matchMedia("(max-width: 800px)").matches)
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

    // Check if user should be logged in automatically
    if (Cookies.get("open-eyebeam-logged-in") && !$isAuthenticated) {
      login()
    }

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

    // let nameCookie = Cookies.get("open-eyebeam-name")
    // let avatarCookie = Cookies.get("open-eyebeam-avatar")

    finalSetUp("visitor", "")

    // if (!nameCookie && !$isAuthenticated) {
    //   // If the user is not onboarded, branch off...
    //   uiState.set(STATE.ONBOARDING)
    // } else {
    //   // ... otherwise, finalize the set up
    //   finalSetUp(nameCookie, avatarCookie)
    // }
  })
</script>

<!-- GAME WORLD -->
{#if $currentRoom}
<div class="viewport" class:pushed={$trayOpen} bind:this={viewportElement}
on:keydown={e => {
  if (e.key === "Escape") {
    activeArticle.set(false)
  }
}}

>
    <Room room={$currentRoom}>
      <!-- PLAYERS -->
      <Players players={$players} currentRoomId={$currentRoom._id} {avatars} />
      <!-- OBJECTS -->
      <Objects objects={get($currentRoom, "objects", [])} />
      <!-- ZONES -->
      <Zones zones={get($currentRoom, "zones", [])} />
      <!-- PORTALS -->
      <Portals portals={get($currentRoom, "portals", [])} on:room={e => {
      if (e.detail.roomId) {
        changeRoom(e.detail.roomId)
      }
      roomIntent.set(false)
    }}
 />
    </Room>
  </div>
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .viewport {
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    opacity: 1;
    transition: transform 0.5s $transition;
    background: $e-ink-dark;

    &.pushed {
      transform: translateY(240px);
    }
  }
</style>
