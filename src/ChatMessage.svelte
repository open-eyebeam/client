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
  import { formattedChatDate } from "./global.js"

  // *** PROPS
  export let message = {}

  // *** STORES
  import { localUserName } from "./stores"
</script>

<div class="chat-message" transition:fade|local>
  <div class="meta">
    <span class="name">{message.name} ({message.room})</span>
    <span class="date">{formattedChatDate(message.timestamp)}</span>
  </div>
  <div class="body">
    {@html anchorme({
      input: message.text,
      options: {
        attributes: {
          target: "_blank",
        },
      },
    })}
  </div>
</div>

<style lang="scss">
  @import "./variables.scss";

  .chat-message {
    margin-bottom: $SPACE_XS;
    padding-bottom: $SPACE_XS;
    padding-left: $SPACE_S;
    padding-right: $SPACE_S;
    color: $COLOR_DARK;
    font-size: $FONT_SIZE_SMALL;
    user-select: none;

    .meta {
      width: 100%;
      display: inline-block;
      color: $COLOR_DARK;

      .name {
        float: left;
        svg {
          path {
            fill: $COLOR_MID;
          }
          &:hover {
            path {
              fill: $COLOR_LIGHT;
            }
          }
        }
      }

      .date {
        font-family: $SERIF_STACK;
        font-weight: normal;
        float: right;
      }
    }

    .body {
      border-left: 1px solid $COLOR_MID;
      padding-left: $SPACE_S;
      padding-right: $SPACE_XS;

      :global(a) {
        color: $COLOR_DARK;
      }
    }
  }
</style>
