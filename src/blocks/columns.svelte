<script>
  // # # # # # # # # # # # # #
  //
  //  TWO-COLUMNS RENDERER
  //
  // # # # # # # # # # # # # #

  // __ IMPORTS
  import has from "lodash/has.js"
  import slugify from "slugify"

  // __ BLOCKS
  import Blocks from "./blocks.svelte"

  // *** PROPS
  export let b = {}
</script>

<div class="columns">
  {#if b.title}
    <h2
      id={slugify(b.title, {
        lower: true,
      })}
    >
      {b.title}
    </h2>
  {/if}
  {#if has(b, "columnContent.content")}
    <div class="inner">
      <Blocks blocks={b.columnContent.content} />
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../variables.scss";

  .columns {
    h2 {
      padding-top: $small-margin;
      padding-bottom: $small-margin;
    }
    .inner {
      width: 100%;
      column-count: 2;
      column-fill: balance;
      column-width: 50%;
    }
  }
</style>
