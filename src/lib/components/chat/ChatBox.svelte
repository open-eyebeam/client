
<script>
  import { afterUpdate } from 'svelte'
  export let messages = [];
  export let room = {};
  // automatically scroll to bottom of box when new message is added
  $: room, console.log('current room: ', room)
  $: messages, console.log('messages: ', messages)
  let scrollBox = null;
  let isMobile, isActive = false;
  const scrollMessages = () => {
    scrollBox.scrollTop = scrollBox.scrollHeight
  }
  afterUpdate(() => {
    scrollMessages()
  })
  //TODO: fix message sizing, limit message length, etc.
</script>

<div class="chat-log" bind:this={scrollBox}>
{#if messages.length <= 0}
  <div class="chat-message">The chat is empty, for now.</div>
{/if}
  {#each messages as message}
  <div class="chat-message">
    <span class="username">{message.name}: </span><span class="message-text"> {message._text}</span>
  </div>
  {/each}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";
  .chat-log {
    width: 100%;
    max-height: 200px;
    display: flex;
    align-items: center;
    user-select: none;
    overflow: scroll;
    font-family: $SERIF_STACK;
    font-size: $font-size-small;
    float: left;
    width: 100%;
    display: block;
    background: $e-ink-medium;
    border: $border-style;
    color: $e-ink-dark;
    border-radius: 0;
    outline: none;
    margin-right: 6px;
    margin-bottom: $SPACE_S;
    &.smaller {
      width: calc(100% - 110px);
    }
    }
    .chat-message {
        width: 100%;
        display: flex;
        padding: $SPACE_S;
        border-bottom: $border-style;
        &:last-child {
          border-bottom: none;
      }
      }
      .message-text {
        padding-left: $SPACE_S;
      }
      .username {
        font-weight: 800;
      }
</style>
