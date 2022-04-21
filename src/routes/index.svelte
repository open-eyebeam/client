<script>
  // *** IMPORTS
  import { onMount } from "svelte"
  import get from "lodash/get.js"
  import sample from "lodash/sample.js"
  import has from "lodash/has.js"
  import inRange from "lodash/inRange.js"
  // *** WORLD LAYERS
  import Room from "$lib/components/world-layers/Room.svelte"
  import Players from "$lib/components/world-layers/Players.svelte"
  import Objects from "$lib/components/world-layers/objects/Objects.svelte"
  import Zones from "$lib/components/world-layers/zones/Zones.svelte"
  import AmbientAudio from "$lib/components/world-layers/AmbientAudio.svelte"
  import Portals from "$lib/components/world-layers/portals/Portals.svelte"
  import Target from "$lib/components/world-layers/TargetMarker.svelte"
  import StreamPlayer from "$lib/components/StreamPlayer.svelte"
  import ArticleBox from "$lib/components/ArticleBox.svelte"
  // *** TEXT COMPONENTS
  import RoomEntryBox from "$lib/components/text-components/RoomEntryBox.svelte"
  import Caption from "$lib/components/text-components/Caption.svelte"
  // *** CHAT
  import Chat from "$lib/components/chat/Chat.svelte"
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
  import { configureAuthClient, profile } from "$lib/modules/authentication.js"
  import { localPlayer } from "$lib/modules/local-player.js"
  import {
    buildWorld,
    worldObject,
    loadAvatars,
    GRID_SIZE,
  } from "$lib/modules/data.js"
  import { initializeKeyboardHandler } from "$lib/modules/keyboard-handler.js"
  import { uiState, STATE, infoLogger, errorLogger } from "$lib/modules/ui.js"
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
  let viewportElement = {}
  let roomIntent = false
  let avatars = []
  let newRoomIntroduction = false
  let activeZone = false

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
    uiState.set(STATE.READY)
  })
</script>

<!-- GAME WORLD -->
{#if $currentRoom}
  <div class="viewport" class:pushed={$trayOpen} bind:this={viewportElement}>
    <Room
      room={$currentRoom}
      x={get($players[$localPlayer.uuid], "x", 100)}
      y={get($players[$localPlayer.uuid], "y", 100)}
      on:move={e => {
        moveTo(e.detail.x, e.detail.y, false)
      }}
    >
      <!-- PLAYERS -->
      <Players players={$players} currentRoomId={$currentRoom._id} {avatars} />
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
