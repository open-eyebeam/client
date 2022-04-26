<script>
  // # # # # # # # # # # # # #
  //
  //  Chat
  //
  // # # # # # # # # # # # # #
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  // *** VARIABLES
  let chatInputValue = ""

  // *** PROPS
  export let chatMessages = []

  const submitChat = () => {
    dispatch("submit", {
      text: chatInputValue,
    })
    chatInputValue = ""
  }
</script>

<div class="chat-container">
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

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .chat-container {
    right: 20px;
    bottom: 20px;
    position: fixed;
    width: 300px;
    z-index: 10000;

    @include screen-size("small") {
      bottom: 130px;
      left: 5px;
      width: calc(100% - 10px);
    }
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
      background: $e-ink-medium;
      border: $border-style;
      color: $e-ink-dark;
      padding: 10px;
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
      line-height: 20px;

      &.close-chat {
        width: 40px;
        margin-left: $SPACE_S;
      }
    }
  }
</style>
