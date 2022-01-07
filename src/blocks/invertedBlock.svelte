<script>
  // # # # # # # # # # # # # #
  //
  //  INVERTED BLOCK
  //
  // # # # # # # # # # # # # #

  // __ BLOCKS
  import Text from "./text.svelte"

  // *** PROPS
  export let b = {}
</script>

<div class="inverted-block">
  <Text {b} />
</div>

<style lang="scss">
  @import "../variables.scss";

  .inverted-block {
    width: 100%;
    background: $e-ink-dark;
    padding: 40px;
    color: $e-ink-light;
  }
</style>
