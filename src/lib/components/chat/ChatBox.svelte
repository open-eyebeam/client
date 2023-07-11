
<script>
  import { afterUpdate } from 'svelte'
  import { isPhone } from "$lib/modules/ui.js" 

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
  import ChatMessage from './ChatMessage.svelte'
</script>

<div class="chat-log" class:is-mobile={$isPhone} bind:this={scrollBox}>
  <div class="chat-message chat-pinned" class:is-mobile={$isPhone}><span class="message-text">For a less ephemeral conversation, <a target="_blank" href="https://discord.gg/NK6EQwrsmz">join our Discord</a>. Send us feedback <a target="_blank" href="https://desk.undersco.re/apps/forms/s/5BqyWk8EsSe4YtCfJEqyni9K">here</a>.</span></div>
{#if messages.length <= 0}
  <div class="chat-message">The chat is empty, for now.</div>
{/if}
  {#each messages as message}
 <ChatMessage message={message} />
  {/each}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";
  .chat-log {
    width: 100%;
    max-height: 400px;
    min-height: 200px;
    display: flex;
    align-items: center;
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
    &.is-mobile {
      height: 50vh;
    }
    }
  .chat-pinned {
    position: absolute;
    background: $e-ink-dark;
    z-index: 1;
    top: 1px;
    height: 70px;
    width: calc(100% - 2px);
           &.is-mobile {
             font-size: 11px;
             padding-right: 24px;
           }
  }
    .chat-message {
        display: flex;
        padding: $SPACE_S;
        border-bottom: 1px solid $e-ink-medium;
        &:last-child {
     //     border-bottom: none;
          
      }
      .message-text {
        padding-left: $SPACE_S;
      }
      .username {
        font-weight: 800;
      }
    }
</style>
