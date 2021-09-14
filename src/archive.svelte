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

  console.log(key)

  // W Key is 87
  // Up arrow is 87
  if (key.keyCode === 87 || key.keyCode === 38) {
    console.log("__pressed: UP")
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
  console.log("keyup")
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
  console.log("targetX", targetX)
  console.log("targetY", targetY)
  gameRoom.send("go", {
    x: targetX,
    y: targetY,
    keyboardNavigation: true,
  })
}

  // __ Game loop
  // __ Called at approximately 60fps by pixi.ticker
  // const updatePositions = (delta) => {
  //   // Combine delta (lag) and potential time passed since window was in focus
  //   let deltaRounded = Math.round(delta) + deltaJump;
  //   deltaJump = 0;
  //   // Iterate over all users currently in move queue
  //   for (let key in moveQ) {
  //     if (localPlayers[key]) {
  //       if (moveQ[key].length > 0) {
  //         if (moveQ[key].length - deltaRounded < 0) {
  //           // User reached destination while the window was out of focus
  //           // Move to final step and clear users's move queue
  //           let step = moveQ[key][moveQ[key].length - 1];
  //           localPlayers[key].avatar.setAnimation(step.direction);
  //           localPlayers[key].avatar.x = step.x;
  //           localPlayers[key].avatar.y = step.y;
  //           localPlayers[key].area = step.area;
  //           moveQ[key] = [];
  //           if (key === $localUserSessionID) {
  //             checkAudioProximity();
  //           }
  //         } else {
  //           // Get next step, adjusting for delta
  //           moveQ[key].splice(0, deltaRounded - 1);
  //           let step = moveQ[key].shift();
  //           localPlayers[key].avatar.setAnimation(step.direction);
  //           localPlayers[key].avatar.x = step.x;
  //           localPlayers[key].avatar.y = step.y;
  //           localPlayers[key].area = step.area;
  //           if (key === $localUserSessionID && moveQ[key].length % 30 === 0) {
  //             // Set current area for users
  //             currentArea.set(localPlayers[$localUserSessionID].area);
  //             // Check proximity to audio installations every 30th step
  //             checkAudioProximity();
  //           }
  //         }
  //       } else {
  //         // Destination reached
  //         if (key === $localUserSessionID) {
  //           hideTarget();
  //           checkAudioProximity();
  //           // User was walking towards a case study
  //           // if (intentToPickUp) {
  //           //   pickUpCaseStudy(intentToPickUp)
  //           // }
  //         }
  //         localPlayers[key].avatar.setAnimation("rest");
  //         delete moveQ[key];
  //       }
  //     } else {
  //       delete moveQ[key];
  //     }
  //   }
  // };

    // const events = loadData(QUERY.EVENTS).catch(err => {
  //   console.log(err)
  // })
  // const exhibitions = loadData(QUERY.EXHIBITIONS).catch(err => {
  //   console.log(err)
  // })
  // const caseStudies = loadData(QUERY.CASE_STUDIES).catch(err => {
  //   console.log(err)
  // })
  // const audioInstallations = loadData(QUERY.AUDIO_INSTALLATIONS).catch(err => {
  //   console.log(err)
  // })
  // const landMarks = loadData(QUERY.LAND_MARKS).catch(err => {
  //   console.log(err)
  // })
  // const users = loadData(QUERY.USERS).catch(err => {
  //   console.log(err)
  // })
  // const pages = loadData(QUERY.PAGES).catch(err => {
  //   console.log(err)
  // })

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

  // const handleVisibilityChange = () => {
  //   if (document[hidden]) {
  //     hiddenTime = Date.now()
  //   } else {
  //     // Number of frames missed (1000ms / 60frames ≈ 16.6666)
  //     deltaJump = Math.round((Date.now() - hiddenTime) / 16.6666)
  //   }
  // }

  // document.addEventListener(visibilityChange, handleVisibilityChange, false)


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