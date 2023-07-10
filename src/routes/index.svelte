<script>
  // * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  //  index.svelte =>
  //  The main view, rendering the game world.
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * *

  import { onMount } from "svelte"
  import { writable } from "svelte/store"
  import {get as svelteGet }from "svelte/store"
  import get from "lodash/get.js"
  import has from "lodash/has.js"
  import Cookies from "js-cookie"
  import { isMobileOrTablet} from "$lib/modules/utilities.js"

  // *** OVERLAYS
  import Onboarding from "$lib/components/overlays/Onboarding.svelte"
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
  // *** SCHEDULE
  import Schedule from "$lib/components/world-layers/schedule/Schedule.svelte"
  // *** PHONE
  import PhoneNavigation from "$lib/components/PhoneNavigation.svelte"

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
    initializeVideoLibHandler,
    videoLibrary,
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
    activeMouse
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
  let streamRect = {}
  let chatRect = {}

  $: {
    if ($players && $players[$localPlayer.uuid]) {
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
    if (svelteGet(uiState) != 0 ) {
    goToRoom({
        id: newRoom._id,
        x: targetX,
        y: targetY,
      })
    } else {
    let player = svelteGet(localPlayer)
      players.update(ps => {
        ps[player.uuid].room =  newRoom._id
        ps[player.uuid].x = targetX
        ps[player.uuid].y = targetY
        ps[player.uuid].inTransit = true
        return ( ps )
      })
       setTimeout(() => {
          players.update(ps => {
                    ps[player.uuid].inTransit = false
                      return (ps)
                  })
              }, 1000)


    }
    await transitionWorldIn(viewportElement)
    if (newRoom.showTitles === false) {
      showLabels.set(false)
    } else {
      showLabels.set(true)
    }
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
    try {
      await connectToGameServer(playerObject)
      infoLogger("✓ (4) Game server connected")
    } catch(e) {
      infoLogger("x (4) Game server not connected")
    }

    // Initialize keyboard handler
    await initializeKeyboardHandler()
    infoLogger("✓ (5) Keyboard initialized")

    // Initialize streams handler
    initializeStreamsHandler()
    infoLogger("✓ (6) Stream listener initialized")
    // Initialize videoLib handler
    initializeVideoLibHandler()
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
    Cookies.set("open-eyebeam-name", name)
    Cookies.set("open-eyebeam-avatar", avatar)
    if (svelteGet(uiState) != 0 ) {
      uiState.set(STATE.READY)
    }
    // Focus on the player's avatar for 3 seconds
    focusPlayer.set(true)
    setTimeout(() => {
      focusPlayer.set(false)
    }, 3000)

    //FIXME: prob need utils for this
    isPhone.set(isMobileOrTablet())

    infoLogger("__ => Welcome to the HACKER ZONE.  Please be respectful of the code while you're here. If you're in the HACKER ZONE, maybe you'd like to check out our GitHub: https://github.com/open-eyebeam.")
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

    let nameCookie = Cookies.get("open-eyebeam-name")
    let avatarCookie = Cookies.get("open-eyebeam-avatar")


    if (!nameCookie && !$isAuthenticated) {
      // If the user is not onboarded, branch off...
      uiState.set(STATE.ONBOARDING)
    } else {
      // ... otherwise, finalize the set up
      finalSetUp(nameCookie, avatarCookie)
    }
  })
  // check for universal stream
  export let universalStream = writable({})
  function getUniversalStream() {
    universalStream.set($streams.filter(stream => { return stream.showEverywhere == true})[0]) 
  }
  let showStream = null
  function selectStream(stream) {

    showStream = stream
  }
$: $streams && getUniversalStream();
$: $universalStream && getUniversalStream();
$: $streams && selectStream($streams.filter(stream => {return $currentRoom._id == stream.parentArea._ref})[0])


</script>
<div role="instructions" class="screenreader-only"><p>If you're using a screenreader, you can navigate through the page with the tab key. You can interact with objects by switching to focus mode and hitting the "Enter" key. If you run into any accessiblity issues, please let us know at tech@eyebeam.org. Enjoy!</p></div>

<!-- ONBOARDING -->
{#if $uiState == STATE.ONBOARDING}
  <Onboarding
    {avatars}
    on:finish={e => {
      finalSetUp(e.detail.name, e.detail.avatar)
    }}
  />
{/if}

<!-- GAME WORLD -->
{#if $currentRoom}
  <div
    class="viewport"
    class:pushed={$trayOpen}
    bind:this={viewportElement}
    aria-hidden={!$activeArticle ? "false" : "true" }
    role="ui"
  >
    <Room room={$currentRoom} players={players} localPlayer={$localPlayer} activeMouse={$activeMouse}>
      <!-- PLAYERS -->
      <Players players={$players} currentRoomId={$currentRoom._id} {avatars} streamRect={streamRect} chatRect={chatRect}/>
      <!-- OBJECTS -->
      <Objects objects={get($currentRoom, "objects", [])} />
      <!-- ZONES -->
      <Zones zones={get($currentRoom, "zones", [])} />
      <!-- PORTALS -->
      <Portals
        portals={get($currentRoom, "portals", [])}
        on:room={e => {
          if (e.detail.roomId) {
            changeRoom(e.detail.roomId)
          }
          roomIntent.set(false)
        }}
      />
    </Room>
  </div>
{/if}

<!-- AMBIENT AUDIO -->
{#if has($currentRoom, "backgroundSound.asset") && $playSound}
  <AmbientAudio soundFile={$currentRoom.backgroundSound} />
{/if}

<!-- LIVE STREAM -->
<div class="streams-container">
{#if !$focusPlayer && $universalStream != undefined}
    <StreamPlayer
      bind:streamRect={streamRect}
      streamUrl={$universalStream.videoUrl}
      audioOnly={$universalStream.audioOnly}
      title={$universalStream.title}
    />
{:else }
    {#each $streams as stream}
      {#if !$focusPlayer && ($currentRoom._id == stream.parentArea._ref || $activeZone._id == stream.parentArea._ref)}
      <StreamPlayer
        bind:streamRect={streamRect}
        streamUrl={stream.videoUrl}
        audioOnly={stream.audioOnly}
        title={stream.title}
        playing={stream.isPlaying}
        hidden={stream._key != showStream._key}
      />
  {/if}
  {/each}
{/if}
{#if $videoLibrary.length >= 1}
    {#each $videoLibrary as lib}
    {#each lib.activeVideos as stream}
      {#if !$focusPlayer}
      <StreamPlayer
        bind:streamRect={streamRect}
        streamUrl={stream.videoUrl}
        audioOnly={stream.audioOnly}
        title={stream.title}
        isVideoLib = {true}
        showVideo={stream.showVideo}
      />
  {/if}
  {/each}
  {/each}
{/if}
<!-- STREAM BUTTONS -->
{#if $streams.length > 1}
  <div class="stream-button-container" class:is-mobile={$isPhone}>
  {#each $streams as stream}
    {#if !$focusPlayer && ($currentRoom._id == stream.parentArea._ref || $activeZone._id == stream.parentArea._ref)}
    <!--<button on:click={selectStream(stream)}>{stream.title}</button>-->
  {/if}
  {/each}
  </div>
{/if}
</div>

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
      let object =  $currentRoom.objects.find(o => o._id == $objectIntent)
      if (object.contentType != "externalLink") {
        activeArticle.set(
        object)
      } else {
        // if it's an external link, open it in a new tab
        window.open(object.url, '_blank').focus()
      }
    
    }
        objectIntent.set(false)
    }}
  />
{/if}

{#if !$focusPlayer && !$trayOpen && !$activeArticle && !$roomIntent && !$objectIntent}
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
<!-- SCHEDULE -->
<Schedule events = {$worldObject.events} vLib = {$videoLibrary} />
<!-- CHAT-->
{#if !$focusPlayer && !$trayOpen && !$activeArticle}
  <Chat
    bind:chatRect={chatRect}
    chatMessages={$chatMessages.filter(m => m.room === $currentRoom._id)}
    on:submit={e => {
      submitChat(e, $currentRoom)
    }}
  />
{/if}

{#if $isPhone && !$activeArticle}
  <PhoneNavigation />
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .viewport {
    height: 100vh;
    width: 100vw;
    position: absolute;
    bottom: 0;
    right: 0;
    overflow: hidden;
    opacity: 1;
    transition: transform 0.5s $transition;
    background: $e-ink-dark;

    &.pushed {
      transform: translateY(240px);
    }
  }
  .screenreader-only {
    position: absolute;
    left: -100000000px;
    top: auto;
    width:1px;
    height:1px;
  }

  .stream-button-container {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    bottom: 20px;
    left: 10px;
    z-index: 10001;
    align-content: space-between;
    width: 180px;
     &.is-mobile {
     width: calc(70% - 24px);
      bottom: 125px;
      align-content: normal;
    justify-content: space-between;
      button {
      font-size: 10px;
      margin-bottom: 0px;
      }
     }
 
  button {
      margin-bottom: 12px; 
      font-family: $SERIF_STACK;
      font-size: $font-size-small;
      border-radius: 15px;
      float: right;
      display: block;
      background: $e-ink-medium;
      border: $border-style;
      color: $e-ink-dark;
      outline: none;
      cursor: pointer;
      height: 40px;
      padding: 10px;
      line-height: 20px;
      width:100%;

  }
  }

</style>
