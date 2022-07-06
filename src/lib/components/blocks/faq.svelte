<script>
  // # # # # # # # # # # # # #
  //
  //  FAQ
  //
  // # # # # # # # # # # # # #

  // __ IMPORTS
  import slugify from "slugify"

  // __ COMPONENTS
  import QA from "$lib/components/qa.svelte"

  // *** PROPS
  export let b = {}
</script>

<div class="faq">
  <h2
    id={slugify(b.title, {
      lower: true,
    })}
  >
    {b.title}
  </h2>
  <div class="faq-inner">
    {#each b.questionAnswer as item}
      <QA {item} />
    {/each}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .faq {
    display: inline-block;
    width: 100%;
    padding: $small-margin;
    margin-bottom: 40px;

    h2 {
      margin-left: 0;
      margin-right: 0;
    }

    @include screen-size("small") {
      padding-left: 0;
      padding-right: 0;
    }

    .faq-inner {
      margin-top: 1em;
    }
  }
</style>
