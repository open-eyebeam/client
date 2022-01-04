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
    right: 20px;
    bottom: 20px;
    position: fixed;
    width: 300px;
    z-index: 10000;

    // @include screen-size("small") {
    //   height: calc(100% - 40px);
    // }
  }

  .chat-input {
    width: 100%;
    display: flex;
    align-items: center;
    user-select: none;

    input {
      font-family: $SERIF_STACK;
      font-size: $font-size-small;
      float: left;
      width: 100%;
      display: block;
      background: $white;
      border: $border-style;
      color: $black;
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
          color: $black;
        }
      }

      select {
        -webkit-appearance: none;
      }
    }

    button {
      font-family: $SERIF_STACK;
      font-size: $font-size-small;
      width: 60px;
      float: right;
      display: block;
      background: $white;
      border: $border-style;
      color: $black;
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
