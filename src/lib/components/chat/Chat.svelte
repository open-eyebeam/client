<script>
  // # # # # # # # # # # # # #
  //
  //  Chat
  //
  // # # # # # # # # # # # # #
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  import {currentRoom} from '$lib/modules/movement.js'
  import {STATE, uiState} from '$lib/modules/ui.js'
  import ChatBox from "./ChatBox.svelte"
  import { isPhone } from "$lib/modules/ui.js" 

  // *** VARIABLES
  let chatInputValue = ""

  // *** PROPS
  export let chatMessages = []
  let showMobile = $isPhone ? false : null;

  const submitChat = () => {
    dispatch("submit", {
      text: chatInputValue,
    })
    chatInputValue = ""
  }
  const showHideMobile = () => {
    showMobile = !showMobile
  }
</script>

<div class="chat-container" class:is-mobile={$isPhone} class:minimize={$isPhone ? !showMobile : false}>
<button class="mobile-button" class:minimize={showMobile} on:click={showHideMobile} >{showMobile ? 'X' : 'Chat'}</button>
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
</div>


<style lang="scss">
  @import "src/lib/style/variables.scss";
  .mobile-button {
    display: none;
  }
  .chat-container {
    right: 20px;
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
    .mobile-button {
      display:block;
      width: 100%;
    }
    .hidden-mobile {
      display:none
    }
    .minimize {
      width: 30px;
      height: 40px;
      font-weight: bold;
      position: absolute;    
      top: 0px;
      right: 0px;
}
  }
</style>
