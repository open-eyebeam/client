<script>
  // # # # # # # # # # # # # #
  //
  //  Chat
  //
  // # # # # # # # # # # # # #

  // *** COMPONENTS
  import { afterUpdate, onMount } from "svelte"
  import ChatMessage from "./ChatMessage.svelte"
  import { links, navigate } from "svelte-routing"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  // *** VARIABLES
  let chatInputValue = ""

  const submitChat = () => {
    dispatch("submit", {
      text: chatInputValue,
    })
    chatInputValue = ""
  }

  // *** DOM REFERENCES
  let messageContainerEl = {}

  // *** PROPS
  export let chatMessages = []

  // afterUpdate(() => {
  //   if (messageContainerEl) {
  //     messageContainerEl.scrollTo({
  //       top: messageContainerEl.scrollHeight,
  //       left: 0,
  //     })
  //   }
  // })

  // onMount(async () => {
  //   if (messageContainerEl) {
  //     setTimeout(() => {
  //       messageContainerEl.scrollTo({
  //         top: messageContainerEl.scrollHeight,
  //         left: 0,
  //       })
  //     }, 2000)
  //   }
  // })
</script>

<div class="chat-container">
  <!-- <div
    id="message-container"
    class="message-container"
    bind:this={messageContainerEl}
  >
    {#each chatMessages as message (message.msgId)}
      <ChatMessage {message} />
    {/each}
  </div> -->
  <div class="chat-input" use:links>
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

<style lang="scss">
  @import "../variables.scss";

  .chat-container {
    right: 40px;
    bottom: 40px;
    position: fixed;
    height: 50px;
    width: 300px;
    background: $COLOR_LIGHT;
    border-radius: 5px;

    // @include screen-size("small") {
    //   height: calc(100% - 40px);
    // }
  }

  .header {
    font-size: $FONT_SIZE_SMALL;
    padding-left: $SPACE_S;
    padding-right: $SPACE_S;
    padding-top: 7px;
    padding-bottom: 7px;
    width: 100%;
    color: $COLOR_DARK;
    border-bottom: $border-style;
    text-align: left;
  }

  .message-container {
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: auto;
    overflow-x: hidden;
    // padding-bottom: $SPACE_S;
    padding-top: $SPACE_S;
    @include hide-scroll;

    // @include screen-size("small") {
    //   height: 100%;
    //   padding-bottom: 0;
    //   padding-top: 0;
    //   &.expanded {
    //     padding-bottom: $SPACE_S;
    //     padding-top: $SPACE_S;
    //     height: calc(100% - 28px);
    //   }
    // }
  }

  .chat-input {
    width: 100%;
    height: 50px;
    padding-left: 7px;
    padding-right: $SPACE_S;
    display: flex;
    align-items: center;
    user-select: none;

    input {
      font-family: $SERIF_STACK;
      font-size: $FONT_SIZE_SMALL;
      float: left;
      width: 100%;
      display: block;
      background: transparent;
      border: $border-style;
      color: $COLOR_DARK;
      padding: $SPACE_S;
      border-radius: 0;
      outline: none;
      height: 30px;
      margin-right: 6px;

      &.smaller {
        width: calc(100% - 110px);
      }

      input[type="text"] {
        -webkit-appearance: none;
        &::placeholder {
          color: $COLOR_DARK;
        }
      }

      select {
        -webkit-appearance: none;
      }
    }

    button {
      font-family: $SERIF_STACK;
      font-size: $FONT_SIZE_SMALL;
      width: 60px;
      float: right;
      display: block;
      background: transparent;
      border: $border-style;
      color: $COLOR_DARK;
      outline: none;
      cursor: pointer;
      border-radius: 0;
      height: 30px;
      line-height: 20px;

      &.close-chat {
        width: 40px;
        margin-left: $SPACE_S;
      }
    }
  }
</style>
