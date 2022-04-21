<script>
  // # # # # # # # # # # # # #
  //
  //  FAQ
  //
  // # # # # # # # # # # # # #

  // __ IMPORTS
  import { has } from "lodash"

  // __ COMPONENTS
  import Blocks from "$lib/components/blocks/blocks.svelte"

  // __ GRAPHICS
  import ArrowDown from "$lib/components/graphics/arrow-down.svelte"
  import ArrowLeft from "$lib/components/graphics/arrow-left.svelte"

  // *** PROPS
  export let item = {}

  // *** VARIABLES
  let open = false

  const toggleOpen = () => {
    open = !open
  }
</script>

<div class="qa">
  <div class="question" on:click={toggleOpen}>
    <div class="text">{item.question}</div>
    <div class="icon">
      {#if open}
        <ArrowDown />
      {:else}
        <ArrowLeft />
      {/if}
    </div>
  </div>
  {#if open}
    <div class="answer">
      {#if has(item, "answer.content", [])}
        <Blocks blocks={item.answer.content} />
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .qa {
    width: 100%;
    display: inline-block;

    .question {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $e-ink-dark;
      cursor: pointer;

      .text {
        font-style: italic;
        user-select: none;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: $font-size-small;
      }

      .icon {
        position: relative;
        top: 6px;
      }
    }

    .answer {
      border-bottom: 1px solid $e-ink-dark;
    }
  }
</style>
