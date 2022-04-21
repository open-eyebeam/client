<script>
  // # # # # # # # # # # # # #
  //
  //  LOGO BLOCK
  //
  // # # # # # # # # # # # # #
  // __ BLOCKS
  import Text from "./text.svelte"

  // __ GRAPHICS
  import BlockBeam from "$lib/components/graphics/block-beam.svelte"

  // *** PROPS
  export let b = {}
</script>

<div class="logo-block">
  <div class="top-row">
    <div class="beam">
      <BlockBeam />
    </div>
    <div class="line" />
  </div>
  <div class="logoblock-text">
    <Text {b} />
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .logo-block {
    margin-left: $small-margin;
    margin-right: $small-margin;
    margin-bottom: $small-margin;
    width: calc(100% - 40px);
    // padding: 15px;
    border-bottom: 1px solid $e-ink-dark;
    font-size: $font-size-body;

    .top-row {
      display: flex;

      .beam {
        width: 160px;
        position: relative;
        top: 0;
        left: 1px;
        // background: red;
        padding: 0;
        line-height: 0;
        display: inline-block;
      }

      .line {
        border-bottom: 1px solid $e-ink-dark;
        width: 100%;
      }
    }

    .logoblock-text {
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }

  :global(.article .logoblock-text p) {
    padding-left: 0;
    padding-right: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
