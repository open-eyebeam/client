<!-- SIDEBAR -->
<!-- Show on desktop only -->
<MediaQuery query="(min-width: 800px)" let:matches>
  {#if matches}
    {#if localPlayers[$localUserSessionID]}
      {#if !sidebarHidden}
        <div
          class="hide-button"
          in:scale={{ delay: 500 }}
          on:click={() => {
            sidebarHidden = !sidebarHidden
            window.dispatchEvent(new Event("resize"))
          }}
        >
          »
        </div>
      {/if}
      <div
        class="sidebar"
        use:links
        class:hidden={sidebarHidden}
        on:click={() => {
          if (sidebarHidden) {
            sidebarHidden = false
            window.dispatchEvent(new Event("resize"))
          }
        }}
      >
        <!-- MINIMAP -->
        <div class="clock">
          <Clock />
        </div>
        <!-- <div class="link-to-ac">
            <a href="http://pohflepp.de/" target="_blank">to Sascha's website</a>
          </div> -->
        <div class="minimap">
          <!-- <MiniMap {miniImage} player={localPlayers[$localUserSessionID]} /> -->
        </div>
        <div class="middle-section">
          <div class="top-area">
            <!-- CALENDAR -->
            <!-- {#await events then events}
                {#await exhibitions then exhibitions}
                  <EventList
                    {events}
                    {exhibitions}
                    showArchived={get($globalSettings, "showArchived", false)}
                  />
                {/await}
              {/await} -->
          </div>
          <div class="bottom-area">
            <!-- {#if section == 'seminar'} -->
            <!-- SEMINAR -->
            <!-- <Seminar {slug} /> -->
            <!-- {:else if section == 'messages'} -->
            <!-- MESSAGES -->
            <!-- <Messaging {slug} />
              {:else} -->
            <!-- CHAT -->
            {#each TEXT_ROOMS as TR}
              {#if $currentTextRoom === TR}
                <Chat
                  chatMessages={chatMessages.filter(
                    m => m.room === TR || m.directed
                  )}
                  currentRoom={TR}
                />
              {/if}
            {/each}
            <!-- {/if} -->
            <!-- TOOLBAR-->
            <div class="toolbar">
              <ToolBar
                {section}
                on:submit={submitChat}
                on:teleport={e => {
                  // __ Cancel current movement
                  delete moveQ[$localUserSessionID]
                  hideTarget()
                  teleportTo($currentArea === 5 ? "green" : "blue")
                }}
              />
            </div>
          </div>
        </div>
        <!-- MENUBAR -->
        <div class="menu">
          <Menu
            on:username={e => {
              Cookies.remove("postrational-username")
              window.location = "/"
            }}
          />
        </div>
      </div>
    {/if}
  {/if}
</MediaQuery>


// PLAYER => ILLEGAL MOVE

// // PLAYER => CLICK / TAP
// viewport.on("clicked", e => {
//   // __ Cancel current movement
//   delete moveQ[$localUserSessionID]
//   hideTarget()
//   // __ Start new movement
//   const targetX = Math.round(e.world.x)
//   const targetY = Math.round(e.world.y)
//   showTarget(targetX, targetY)
//   gameRoom.send("go", {
//     x: targetX,
//     y: targetY,
//     originX: localPlayers[$localUserSessionID].avatar.x,
//     originY: localPlayers[$localUserSessionID].avatar.y,
//     keyboardNavigation: false,
//   })
// })

// // PLAYER => TOUCH END
// viewport.on("touchend", e => {
//   // __ Convert screen coordinates to world coordinates
//   const world = viewport.toWorld(e.data.global.x, e.data.global.y)
//   // __ Cancel current movement
//   delete moveQ[$localUserSessionID]
//   hideTarget()
//   // // __ Start new movement
//   const targetX = Math.round(world.x)
//   const targetY = Math.round(world.y)
//   showTarget(targetX, targetY)
//   gameRoom.send("go", {
//     x: targetX,
//     y: targetY,
//     originX: localPlayers[$localUserSessionID].avatar.x,
//     originY: localPlayers[$localUserSessionID].avatar.y,
//     keyboardNavigation: false,
//   })
// })

// PLAYER => KEY DOWN
document.addEventListener("keydown", key => {
  // let currentX = localPlayers[$localUserSessionID].avatar.x
  // let currentY = localPlayers[$localUserSessionID].avatar.y
  // console.log("currentX", currentX)
  // console.log("currentY", currentY)
  // let targetX = currentX
  // let targetY = currentY

  // console.log(key)

  // W Key is 87
  // Up arrow is 87
  if (key.keyCode === 87 || key.keyCode === 38) {
    // console.log("__pressed: UP")
    pressedKeys["UP"] = true
    // __ Cancel current movement
    // delete moveQ[$localUserSessionID]
    // targetY -= 10
    // gameRoom.send("go", {
    //   x: targetX,
    //   y: targetY,
    //   originX: currentX,
    //   originY: currentY,
    // })
  }

  // S Key is 83
  // Down arrow is 40
  if (key.keyCode === 83 || key.keyCode === 40) {
    // console.log("__pressed: DOWN")
    pressedKeys["DOWN"] = true
  }

  // A Key is 65
  // Left arrow is 37
  if (key.keyCode === 65 || key.keyCode === 37) {
    // console.log("__pressed: LEFT")
    pressedKeys["LEFT"] = true
  }

  // D Key is 68
  // Right arrow is 39
  if (key.keyCode === 68 || key.keyCode === 39) {
    // console.log("__pressed: RIGHT")
    pressedKeys["RIGHT"] = true
  }
})

document.addEventListener("keyup", key => {
  // console.log("keyup")
  // W Key is 87
  // Up arrow is 87
  if (key.keyCode === 87 || key.keyCode === 38) {
    // console.log("__released: UP")
    pressedKeys["UP"] = false
    releasedKey = true
  }

  // S Key is 83
  // Down arrow is 40
  if (key.keyCode === 83 || key.keyCode === 40) {
    // console.log("__released: DOWN")
    pressedKeys["DOWN"] = false
    releasedKey = true
  }

  // A Key is 65
  // Left arrow is 37
  if (key.keyCode === 65 || key.keyCode === 37) {
    // console.log("__released: LEFT")
    pressedKeys["LEFT"] = false
    releasedKey = true
  }

  // D Key is 68
  // Right arrow is 39
  if (key.keyCode === 68 || key.keyCode === 39) {
    // console.log("__released: RIGHT")
    pressedKeys["RIGHT"] = false
    releasedKey = true
  }
})

// PLAYER => TELEPORT
teleportTo = area => {
  // __ Cancel current movement
  delete moveQ[$localUserSessionID]
  hideTarget()
  gameRoom.send("teleport", {
    area: area,
  })
}

sendKeyboardMove = () => {
  let targetX = localPlayers[$localUserSessionID].avatar.x
  let targetY = localPlayers[$localUserSessionID].avatar.y
  // console.log("targetX", targetX)
  // console.log("targetY", targetY)
  gameRoom.send("go", {
    x: targetX,
    y: targetY,
    keyboardNavigation: true,
  })
}

  // __ Game loop
  // __ Called at approximately 60fps by pixi.ticker
  const updatePositions = (delta) => {
    // Combine delta (lag) and potential time passed since window was in focus
    let deltaRounded = Math.round(delta) + deltaJump;
    deltaJump = 0;
    // Iterate over all users currently in move queue
    for (let key in moveQ) {
      if (localPlayers[key]) {
        if (moveQ[key].length > 0) {
          if (moveQ[key].length - deltaRounded < 0) {
            // User reached destination while the window was out of focus
            // Move to final step and clear users's move queue
            let step = moveQ[key][moveQ[key].length - 1];
            localPlayers[key].avatar.setAnimation(step.direction);
            localPlayers[key].avatar.x = step.x;
            localPlayers[key].avatar.y = step.y;
            localPlayers[key].area = step.area;
            moveQ[key] = [];
            if (key === $localUserSessionID) {
              checkAudioProximity();
            }
          } else {
            // Get next step, adjusting for delta
            moveQ[key].splice(0, deltaRounded - 1);
            let step = moveQ[key].shift();
            localPlayers[key].avatar.setAnimation(step.direction);
            localPlayers[key].avatar.x = step.x;
            localPlayers[key].avatar.y = step.y;
            localPlayers[key].area = step.area;
            if (key === $localUserSessionID && moveQ[key].length % 30 === 0) {
              // Set current area for users
              currentArea.set(localPlayers[$localUserSessionID].area);
              // Check proximity to audio installations every 30th step
              checkAudioProximity();
            }
          }
        } else {
          // Destination reached
          if (key === $localUserSessionID) {
            hideTarget();
            checkAudioProximity();
            // User was walking towards a case study
            // if (intentToPickUp) {
            //   pickUpCaseStudy(intentToPickUp)
            // }
          }
          localPlayers[key].avatar.setAnimation("rest");
          delete moveQ[key];
        }
      } else {
        delete moveQ[key];
      }
    }
  };

  // __ Set global user list
  // users.then(users => {
  //   globalUserList.set(users)
  //   return users
  // })


  // ___ Routing
  let section = false
  let slug = false
  // let sso = false
  // let sig = false
  // let returnSection = false
  // let returnSlug = false

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
    }
  }

  document.addEventListener(visibilityChange, handleVisibilityChange, false)

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

            // if ($localUserUUID == message.uuid) {
          //   const messageContainerEl =
          //     document.querySelector("#message-container")
          //   if (messageContainerEl) {
          //     setTimeout(() => {
          //       messageContainerEl.scrollTo({
          //         top: messageContainerEl.scrollHeight,
          //         left: 0,
          //         behavious: "smooth",
          //       })
          //     }, 200)
          //   }
          // }


                      // MESSAGE => ADD
                      gameRoom.state.messages.onAdd = (message) => {
              chatMessages = [...chatMessages, message];
              if ($localUserUUID == message.uuid) {
                const messageContainerEl = document.querySelector(
                  "#message-container"
                );
                if (messageContainerEl) {
                  setTimeout(() => {
                    messageContainerEl.scrollTo({
                      top: messageContainerEl.scrollHeight,
                      left: 0,
                      behavious: "smooth",
                    });
                  }, 200);
                }
              }
            };
            // MESSAGE => REMOVE
            gameRoom.onMessage("nukeMessage", (msgIdToRemove) => {
              const itemIndex = chatMessages.findIndex(
                (m) => m.msgId === msgIdToRemove
              );
              chatMessages.splice(itemIndex, 1);
              chatMessages = chatMessages;
            });
            // MESSAGE => SUBMIT
            submitChat = (event) => {
              try {
                gameRoom.send("submitChatMessage", {
                  msgId: nanoid(),
                  uuid: $localUserUUID,
                  name: localPlayers[$localUserSessionID].name,
                  username: localPlayers[$localUserSessionID].discourseName,
                  authenticated:
                    localPlayers[$localUserSessionID].authenticated,
                  text: event.detail.text,
                  room: $currentTextRoom,
                  tint: localPlayers[$localUserSessionID].tint,
                });
              } catch (err) {
                setUIState(STATE.ERROR, err);
                console.dir(err);
              }
            };


                // PLAYER => KEY UP
    document.addEventListener("keyup", key => {
      if (UI.state == STATE.READY) {
        // console.log("keyup")
        // W Key is 87 & Up arrow is 87
        if (key.keyCode === 38) {
          // console.log("__released: UP")
          pressedKeys["UP"] = false
          releasedKey = true
        }
        // S Key is 83 & Down arrow is 40
        if (key.keyCode === 40) {
          // console.log("__released: DOWN")
          pressedKeys["DOWN"] = false
          releasedKey = true
        }
        // A Key is 65 & Left arrow is 37
        if (key.keyCode === 37) {
          // console.log("__released: LEFT")
          pressedKeys["LEFT"] = false
          releasedKey = true
        }
        // D Key is 68 & Right arrow is 39
        if (key.keyCode === 39) {
          // console.log("__released: RIGHT")
          pressedKeys["RIGHT"] = false
          releasedKey = true
        }
      }
    })

    if (releasedKey) {
          // console.log("KEY released")
          releasedKey = false
          // moveTo(players[$localUserUUID].x, players[$localUserUUID].y, true)
        }

        <style>
          
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
<div class="zone" class:active={testZoneActive} in:fade bind:this={testZoneElement}>
    <div class="zone-name">Test zone</div>
</div>
<!-- PUDDLE -->
<div class="puddle" class:active={puddleZoneActive} in:fade bind:this={puddleZoneElement}>
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

// IF: User is logged in => Set name and shape and state = READY
// if (isAuthenticated) {
// console.log("___ (1) User is authenticated")
// profile.set(await auth0.getUser())
// let sanityProfile = await loadData(
// "*[_type == 'user' && _id == $sub][0]",
// { sub: $profile.sub.replace(DISCORD_PREFIX, "") }
// )
// console.log(sanityProfile)
// profileMeta.set(sanityProfile)
// localUserName.set($profileMeta.name)
// playerObject.name = $profileMeta.name
// playerObject.shape = "star"
// playerObject.onboarded = true
// initializeWorld(playerObject)
// return
// }

// IF: User is currently logging in => Set name and shape and state = READY
// Check for the code and state parameters
// const query = window.location.search
// if (query.includes("code=") && query.includes("state=")) {
// console.log("___ (2) User just logged in ")
// // // Process the login state
// await auth0.handleRedirectCallback()
// isAuthenticated = await auth0.isAuthenticated()
// // // Use replaceState to redirect the user away and remove the querystring parameters
// window.history.replaceState({}, document.title, "/")
// if (isAuthenticated) {
// // let prof = await auth0.getUser()
// // console.log("prof", prof)
// profile.set(await auth0.getUser())
// let sanityProfile = await loadData(
// "*[_type == 'user' && _id == $sub][0]",
// { sub: $profile.sub.replace(DISCORD_PREFIX, "") }
// )
// console.log(sanityProfile)
// profileMeta.set(sanityProfile)
// localUserName.set($profileMeta.name)
// playerObject.name = $profileMeta.name
// playerObject.shape = "star"
// playerObject.onboarded = true
// initializeWorld(playerObject)
// return
// }
// }

// $: console.log("$profileMeta", $profileMeta)

// const usernameCookie = Cookies.get("open-eyebeam__name")
// console.log("usernameCookie", usernameCookie)
// const userShapeCookie = Cookies.get("open-eyebeam__shape")
// console.log("userShapeCookie", userShapeCookie)
// if (usernameCookie && userShapeCookie) {
// console.log("___ (3) Cookies are set")
// localUserName.set(usernameCookie)
// playerObject.name = usernameCookie
// playerObject.shape = userShapeCookie
// playerObject.onboarded = true
// initializeWorld(playerObject)
// return
// } else {
// console.log("___ (4) New user. Start onboarding...")
// setUIState(STATE.ONBOARDING)
// initializeWorld(playerObject)
// return
// }

// let testZoneActive = false
// let puddleZoneActive = false

// const checkDoorOverlap = () => {
// const avatarElement = document.getElementById($localUserUUID)
// if (avatarElement) {
// if (
// meetingDoorElement &&
// isOverlapping(avatarElement, meetingDoorElement)
// ) {
// if (captions.findIndex(c => c.roomId === "meeting") === -1) {
// captions = []
// captions.push({
// text: "Enter meeting room?",
// roomId: "meeting",
// type: "room",
// })
// captions = captions
// }
// return
// }
// if (
// screeningDoorElement &&
// isOverlapping(avatarElement, screeningDoorElement)
// ) {
// if (captions.findIndex(c => c.roomId === "screening") === -1) {
// captions = []
// captions.push({
// text: "Enter screening room?",
// roomId: "screening",
// type: "room",
// })
// captions = captions
// }
// return
// }
// if (
// exhibitionDoorElement &&
// isOverlapping(avatarElement, exhibitionDoorElement)
// ) {
// if (captions.findIndex(c => c.roomId === "exhibition") === -1) {
// captions = []
// captions.push({
// text: "Enter exhibition room?",
// roomId: "exhibition",
// type: "room",
// })
// captions = captions
// }
// return
// }
// if (fieldDoorElement && isOverlapping(avatarElement, fieldDoorElement)) {
// if (captions.findIndex(c => c.roomId === "field") === -1) {
// captions = []
// captions.push({
// text: "Return to the Field?",
// roomId: "field",
// type: "room",
// })
// captions = captions
// }
// return
// }
// if (testZoneElement && isOverlapping(avatarElement, testZoneElement)) {
// if (captions.findIndex(c => c.roomId === "test-zone") === -1) {
// captions = []
// captions.push({
// text: "You entered the test zone.",
// roomId: "test-zone",
// type: "introduction",
// })
// captions = captions
// }
// testZoneActive = true
// return
// }
// if (
// puddleZoneElement &&
// isOverlapping(avatarElement, puddleZoneElement)
// ) {
// if (captions.findIndex(c => c.roomId === "test-zone") === -1) {
// captions = []
// captions.push({
// text: "You entered the puddle.",
// roomId: "puddle",
// type: "introduction",
// })
// captions = captions
// }
// puddleZoneActive = true
// return
// }
// if (teamDoorElement && isOverlapping(avatarElement, teamDoorElement)) {
// if (captions.findIndex(c => c.roomId === "field") === -1) {
// captions = []
// captions.push({
// text: "Enter team room?",
// roomId: "team",
// type: "room",
// })
// captions = captions
// }
// return
// }
// testZoneActive = false
// puddleZoneActive = false
// captions = []
// }
// }

// const addIntroCaption = t => {
// captions = []
// // setTimeout(() => {
// captions.push({ text: t, type: "introduction" })
// captions = captions
// }

// $: {
// // console.log($currentArea)
// // console.log(rooms)
// if ($currentArea) {
// // console.log("–_—_—_ => Area changed")
// const area = rooms.find(r => r.slug.current === $currentArea)
// // console.log(area)
// if (area) {
// // TOGGLE CHAT
// showChat = area.chat
// // CHANGE CAPTION
// if (area.introduction) {
// addIntroCaption(area.introduction)
// }
// // CHANGE SOUND
// if (area.soundFile && area.soundFile.asset) {
// soundFile = area.soundFile
// } else {
// soundFile = false
// }
// // CHANGE STREAM
// if (area.stream) {
// streamUrl = area.stream
// } else {
// streamUrl = false
// }
// }
// }
// }

// let meetingDoorElement = {}
// let screeningDoorElement = {}
// let exhibitionDoorElement = {}
// let testZoneElement = {}
// let puddleZoneElement = {}
// let fieldDoorElement = false
// let teamDoorElement = false

// ROOM CHANGE
// if (player.room !== players[player.uuid].room) {
// // console.log("CHANGE ROOM", player.uuid, player.room)
// // console.log(player)

// if (player.uuid === $localUserUUID) {
// // currentArea.set(player.room)
// delete players[$localUserUUID]

// let tl = gsap.timeline() //create the timeline
// tl.to(viewportElement, 1, {
// css: { backgroundColor: "rgb(226, 229, 223)" },
// })
// tl.to(viewportElement, 1, {
// css: { backgroundColor: "rgb(14, 13, 13)" },
// })

// let tl2 = gsap.timeline() //create the timeline
// tl2.to(mapElement, 1, {
// css: { backgroundColor: "rgb(14, 13, 13)" },
// })
// tl2.to(mapElement, 1, {
// css: { backgroundColor: "rgb(205 205 205)" },
// })

// tl2.play()
// tl.play()

// setTimeout(() => {
// currentArea.set(player.room)
// players[$localUserUUID] = {
// name: player.name,
// x: player.x,
// y: player.y,
// room: player.room,
// shape: player.shape,
// self: true,
// onboarded: true,
// }
// }, 1000)

// // tl.eventCallback("onComplete", () => {

// // })
// } else {
// players[player.uuid].x = player.x
// players[player.uuid].y = player.y
// players[player.uuid].room = player.room
// }

// return
// }



      // for (let key in moveQ) {
      //   // console.log("$players[key]", $players[key].room)
      //   // && $players[key].room === currentRoom._id
      //   if ($players[key]) {
      //     if (moveQ[key].length > 0) {
      //       if (moveQ[key].length - $deltaJump < 0) {
      //         // User reached destination while the window was out of focus
      //         // Move to final step and clear users's move queue
      //         let step = moveQ[key][moveQ[key].length - 1]
      //         $players[key].x = step.x
      //         $players[key].y = step.y
      //         delete moveQ[key]
      //         if ($players[key].self) {
      //           showTarget.set(false)
      //           checkPortalOverlap()
      //           checkZoneOverlap()
      //         }
      //       } else {
      //         // Get next step, adjusting for delta
      //         moveQ[key].splice(0, $deltaJump - 1)
      //         let step = moveQ[key].shift()
      //         // console.log(step.x, step.y)
      //         // console.log("$players[key]", $players[key])
      //         $players[key].x = step.x
      //         $players[key].y = step.y
      //         // if ($players[key].self) {
      //         //   // checkDoorOverlap()
      //         // }
      //       }
      //     } else {
      //       // console.log("___ DONE")
      //       // Destination reached
      //       // console.log($players[key])
      //       if ($players[key].self) {
      //         targetX.set(0)
      //         targetY.set(0)
      //         showTarget.set(false)
      //         checkPortalOverlap()
      //         checkZoneOverlap()
      //       }
      //       delete moveQ[key]
      //     }
      //   } else {
      //     delete moveQ[key]
      //   }
      // }
      // deltaJump.set(0)
      // window.requestAnimationFrame(step)

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


    // const animationLoop = () => {
  //   const step = timestamp => {
  //     // console.log("step", timestamp)
  //     // console.log("moveQ", moveQ)
  //     // __ Keyboard navigation
  //     if ($players[$localPlayer.uuid]) {
  //       if (Object.values(pressedKeys).some(k => k)) {
  //         // console.log("KEY PRESSED", pressedKeys)
  //         if (pressedKeys["UP"]) {
  //           // console.log("UP")
  //           if ($players[$localPlayer.uuid].y > 0) {
  //             players.update(ps => {
  //               ps[$localPlayer.uuid].y -= 1
  //               return ps
  //             })
  //           }
  //         }
  //         if (pressedKeys["DOWN"]) {
  //           // console.log("DOWN")
  //           if (
  //             $players[$localPlayer.uuid].y <
  //             $currentRoom.dimensions.height * GRID_SIZE - 30
  //           ) {
  //             players.update(ps => {
  //               ps[$localPlayer.uuid].y += 1
  //               return ps
  //             })
  //           }
  //         }
  //         if (pressedKeys["LEFT"]) {
  //           // console.log("LEFT")
  //           if ($players[$localPlayer.uuid].x > 0) {
  //             players.update(ps => {
  //               ps[$localPlayer.uuid].x -= 1
  //               return ps
  //             })
  //           }
  //         }
  //         if (pressedKeys["RIGHT"]) {
  //           // console.log("RIGHT")
  //           if (
  //             $players[$localPlayer.uuid].x <
  //             $currentRoom.dimensions.width * GRID_SIZE - 30
  //           ) {
  //             players.update(ps => {
  //               ps[$localPlayer.uuid].x += 1
  //               return ps
  //             })
  //           }
  //         }
  //         moveTo(
  //           $players[$localPlayer.uuid].x,
  //           $players[$localPlayer.uuid].y,
  //           true
  //         )
  //         checkPortalOverlap()
  //         checkZoneOverlap()
  //         pressedKeys["UP"] = false
  //         pressedKeys["DOWN"] = false
  //         pressedKeys["LEFT"] = false
  //         pressedKeys["RIGHT"] = false
  //       }
  //     }
  //     window.requestAnimationFrame(step)
  //   }
  //   window.requestAnimationFrame(step)
  // }
