<script>
  // * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  //  index.svelte =>
  //  The main view, rendering the game world.
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * *

  import { onMount } from "svelte"
  import get from "lodash/get.js"
  import sample from "lodash/sample.js"
  import has from "lodash/has.js"
  import Cookies from "js-cookie"

  // *** WORLD LAYERS
  import Room from "$lib/components/world-layers/Room.svelte"
  import Players from "$lib/components/world-layers/Players.svelte"
  import Objects from "$lib/components/world-layers/objects/Objects.svelte"
  import Zones from "$lib/components/world-layers/zones/Zones.svelte"
  import AmbientAudio from "$lib/components/world-layers/AmbientAudio.svelte"
  import Portals from "$lib/components/world-layers/portals/Portals.svelte"
  import StreamPlayer from "$lib/components/StreamPlayer.svelte"
  import ArticleBox from "$lib/components/ArticleBox.svelte"
  // *** TEXT COMPONENTS
  import RoomEntryBox from "$lib/components/text-components/RoomEntryBox.svelte"
  import ObjectInspectionBox from "$lib/components/text-components/ObjectInspectionBox.svelte"
  import Caption from "$lib/components/text-components/Caption.svelte"
  // *** CHAT
  import Chat from "$lib/components/chat/Chat.svelte"

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

    const oldRoomId = $currentRoom._id
    const newRoom = $worldObject[id]
    currentRoom.set(newRoom)

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
    let visitorCookie = Cookies.get("open-eyebeam-logged-in")
    console.log("visitorCookie", visitorCookie)
    console.log("$isAuthenticated", $isAuthenticated)
    if (visitorCookie && !$isAuthenticated) {
      console.log("Logging in...")
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
    uiState.set(STATE.READY)
  })
</script>

<!-- GAME WORLD -->
{#if $currentRoom}
  <div class="viewport" class:pushed={$trayOpen} bind:this={viewportElement}>
    <Room room={$currentRoom}>
      <!-- PLAYERS -->
      <Players players={$players} currentRoomId={$currentRoom._id} {avatars} />
      <!-- OBJECTS -->
      <Objects objects={get($currentRoom, "objects", [])} />
      <!-- ZONES -->
      <Zones zones={get($currentRoom, "zones", [])} />
      <!-- PORTALS -->
      <Portals portals={get($currentRoom, "portals", [])} />
    </Room>
  </div>
{/if}

<!-- AMBIENT AUDIO -->
{#if has($currentRoom, "backgroundSound.asset") && $playSound}
  <AmbientAudio soundFile={$currentRoom.backgroundSound} />
{/if}

<!-- LIVE STREAM -->
{#each $streams as stream}
  {#if $currentRoom._id == stream.parentArea._ref || $activeZone._id == stream.parentArea._ref}
    <StreamPlayer streamUrl={stream.videoUrl} />
  {/if}
{/each}

<!-- ROOM ENTRY BOX -->
{#if $roomIntent}
  <RoomEntryBox
    roomIntent={$roomIntent}
    roomTitle={$worldObject[$roomIntent].title}
    on:room={e => {
      if (e.detail.roomId) {
        changeRoom($roomIntent)
      }
      roomIntent.set(false)
    }}
  />
{/if}

<!-- OBJECT INSPECTION BOX -->
{#if $objectIntent}
  <ObjectInspectionBox
    objectIntent={$objectIntent}
    objectTitle={$currentRoom.objects.find(o => o._id == $objectIntent).title}
    on:object={e => {
      if (e.detail.objectId) {
        activeArticle.set(
          $currentRoom.objects.find(o => o._id == $objectIntent)
        )
      }
      objectIntent.set(false)
    }}
  />
{/if}

{#if !$trayOpen && !$activeArticle && !$roomIntent && !$objectIntent}
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
