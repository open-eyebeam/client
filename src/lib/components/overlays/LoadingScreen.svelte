<script>
  // # # # # # # # # # # # # #
  //
  //  LOADING SCREEN
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import AnimatedBeam from "$lib/components/graphics/animated-beam.svelte"
</script>

<div class="loading-screen" transition:fade={{ delay: 500 }}>
  <div class="box">
    <AnimatedBeam />
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $e-ink-dark;
    color: $e-ink-light;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;

    .box {
      font-family: $SERIF_STACK;
      padding: 20px;
      height: 200px;
      font-size: $font-size-small;
      text-align: center;
      user-select: none;
      @include screen-size("small") {
        font-size: $font-size-extra-small;
      }
    }
  }
</style>
