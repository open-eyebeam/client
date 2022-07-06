<script>
  // # # # # # # # # # # # # #
  //
  //  DIVIDER BLOCK
  //
  // # # # # # # # # # # # # #

  // *** PROPS
  export let b = {}
</script>

<div class="divider" />

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .divider {
    margin-top: $small-margin;
    margin-bottom: $small-margin;
    height: 1px;
    border-top: 1px solid $e-ink-dark;
    width: 100%;
  }
</style>
