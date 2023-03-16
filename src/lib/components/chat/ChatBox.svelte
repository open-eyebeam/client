
<script>
  import { afterUpdate } from 'svelte'
  export let messages = [];
  export let room = {};
  // automatically scroll to bottom of box when new message is added
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
  <div class="chat-message chat-pinned"><span class="message-text">For a less ephemeral conversation, <a href="https://discord.gg/QNRHD6Kwhk">join our Discord.</a></span></div>
{#if messages.length <= 0}
  <div class="chat-message">The chat is empty, for now.</div>
{/if}
  {#each messages as message}
  <div class="chat-message" aria-live="polite">
    <span class="username">{message.name}: </span><span class="message-text"> {message._text}</span>
  </div>
  {/each}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";
  .chat-log {
    width: 100%;
    max-height: 300px;
    min-height: 100px;
    display: flex;
    align-items: center;
    user-select: none;
    overflow: scroll;
    font-family: $SERIF_STACK;
    font-size: $font-size-small;
    float: left;
    width: 100%;
    display: block;
    background: $e-ink-dark;
    border: 1px solid $e-ink-medium;
    color: $e-ink-medium;
    border-radius: 0;
    outline: none;
    padding-top: 70px;
    margin-right: 6px;
    margin-bottom: $SPACE_S;
    &.smaller {
      width: calc(100% - 110px);
    }
    a {
     color: $e-ink-medium;
    }
    }
  .chat-pinned {
    position: absolute;
    background: $e-ink-dark;
    border-right: 1px solid $e-ink-medium;
    z-index: 1;
    top: 1px;
    height: 70px;
  }
    .chat-message {
        display: flex;
        padding: $SPACE_S;
        border-bottom: 1px solid $e-ink-medium;
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
