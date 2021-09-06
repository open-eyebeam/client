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
