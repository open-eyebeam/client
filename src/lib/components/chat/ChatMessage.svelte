<script>
  // # # # # # # # # # # # # #
  //
  //  Chat Message
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import anchorme from "anchorme"

  // *** GLOBALS
  import { formattedChatDate } from "$lib/modules/utilities.js"

  // *** PROPS
  export let message = {}
  $: console.log('message: ', message)
</script>

<div class="chat-message" aria-live="polite" transition:fade|local >
    <span class="username">{message.name}: </span><span class="message-text">
    {@html anchorme({
      input: message.text,
      options: {
        attributes: {
          target: "_blank",
          class: "inline-link"
        },
      },
    })}
    </span>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";
  :global(.inline-link) {
      color: $e-ink-medium !important;
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
