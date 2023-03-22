<script>
  // # # # # # # # # # # # # #
  //
  //  Chat
  //
  // # # # # # # # # # # # # #
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  import { get  } from "svelte/store"
  import BadWords from 'bad-words'  
 import {currentRoom} from '$lib/modules/movement.js'
  import {STATE, uiState} from '$lib/modules/ui.js'
  import ChatBox from "./ChatBox.svelte"
  import { isPhone } from "$lib/modules/ui.js" 
  
  const censor = new BadWords()
  // *** VARIABLES
  let chatInputValue = ""

  // *** PROPS
  export let chatMessages = []
  let showMobile = $isPhone ? false : null;

  const submitChat = () => {
    dispatch("submit", {
      text: censor.clean(chatInputValue),
    })
    chatInputValue = ""
  }
  const showHideMobile = () => {
    showMobile = !showMobile
  }

$: chatSettings = $currentRoom.chatSettings != undefined ? $currentRoom.chatSettings : {useDiscord: false, discordChannelId: undefined}
$: discordURL = `https://e.widgetbot.io/channels/806275264807698482/${chatSettings.discordChannelId}` 
</script>
<div class:is-mobile={$isPhone} class="chat-container" class:minimize={$isPhone ? !showMobile : false}>
<button class="mobile-button" class:minimize={showMobile} on:click={showHideMobile} >{showMobile ? 'X' : 'Chat'}</button>
{#if chatSettings == undefined || chatSettings.useDiscord != true || chatSettings.discordChannelId == undefined}
<div class="chat-content" class:hidden-mobile={!showMobile}>
    <ChatBox messages={chatMessages} room={$currentRoom}/>
    <div class="chat-input">
    <input
      placeholder="Write a message..."
      type="[text]"
      maxlength="600"
      bind:value={chatInputValue}
      on:keydown={e => {
        if (e.keyCode == 13) submitChat()
      }}
    />
    <button on:click={submitChat}>Send</button>
  </div>
</div>
{:else}
<iframe class="discord-widget" class:hidden-mobile={!showMobile} src={ discordURL } style="sidebar:display:none;"></iframe>
{/if}
</div>
<style lang="scss">
  @import "src/lib/style/variables.scss";
  .discord-widget {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 300px;
    max-width: 35%;
    height: 70%;
  }

  .mobile-button {
    display: none;
  }
  .chat-container {
    right: 20px;
    max-height:100%;
    bottom: 20px;
    position: fixed;
    width: 300px;
    z-index: 10000;

    &.is-mobile {
      bottom: 125px;
      right: 10px;
      width: calc(100% - 20px);
    }
    &.minimize {
      width: calc(30% - 10px);
      height: auto;
    }

  }

  .chat-input {
    width: 100%;
    display: flex;
    align-items: center;
    user-select: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    input {
      font-family: $SERIF_STACK;
      font-size: $font-size-small;
      float: left;
      width: 100%;
      display: block;
      background: $e-ink-medium;
      border: $border-style;
      color: $e-ink-dark;
      padding: 0 10px;
      border-radius: 0;
      outline: none;
      height: 40px;
      margin-right: 6px;

      &.smaller {
        width: calc(100% - 110px);
      }

      input[type="text"] {
        -webkit-appearance: none;
        &::placeholder {
          color: $e-ink-dark;
        }
      }

      select {
        -webkit-appearance: none;
      }
    }

      }
button {
      font-family: $SERIF_STACK;
      font-size: $font-size-small;
      width: 60px;
      float: right;
      display: block;
      background: $e-ink-medium;
      border: $border-style;
      color: $e-ink-dark;
      outline: none;
      cursor: pointer;
      border-radius: 0;
      height: 40px;
      padding: 10px;
      line-height: 20px;

      &.close-chat {
        width: 40px;
        margin-left: $SPACE_S;
      }
    }
  .is-mobile {
    .discord-widget {
      height: 45%;
      max-width: 100%;
      width: 100%;
      bottom: 120px;
      right: 0;
    }

    .mobile-button {
      display:block;
      width: 100%;
      z-index: 1;
    }
    .hidden-mobile {
      display:none
    }
    .minimize {
      width: 40px;
      height: 40px;
      font-weight: bold;
      position: fixed;
      bottom: calc(45% + 80px);
      right: 0;
}
  }
</style>
