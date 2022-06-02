<script>
  import { afterUpdate } from 'svelte'
  export let messages = [];
  // automatically scroll to bottom of box when new message is added
  let scrollBox = null;
  const scrollMessages = () => {
    scrollBox.scrollTop = scrollBox.scrollHeight
  }
  afterUpdate(() => {
    scrollMessages()
  })
  //TODO: fix message sizing, limit message length, etc.
</script>

<div class="chat-log" bind:this={scrollBox}>
  {#each messages as message}
  <div class="chat-message">
    <span class="username">{message.name}:</span><span class="message-text">{message._text}</span>
  </div>
  {/each}
</div>

<style lang="scss">
  @import "../variables.scss";

  .chat-log {
    width: 100%;
    height: 200px;
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
      }
</style>
