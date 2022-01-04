<script>
  // # # # # # # # # # # # # #
  //
  //  RECONNECTION SCREEN
  //
  // # # # # # # # # # # # # #

  // *** PROPS
  export let reconnectionAttempts = 0
  export let disconnectionCode = 0
</script>

<div class="reconnection">
  <div class="box">
    <div class="header">
      You have been disconnected from the gameserver. (Error: {disconnectionCode})
    </div>
    <div class="header">Please reload the page to attempt to reconnect.</div>
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .reconnection {
    position: fixed;
    bottom: 15px;
    left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;

    @include screen-size("small") {
      bottom: 55px;
      left: 0;
    }

    .box {
      font-family: $SERIF_STACK;
      padding: 20px;
      background: $e-ink-light;
      color: $e-ink-dark;
      font-size: $font-size-small;
      text-align: center;
      user-select: none;

      @include screen-size("small") {
        width: calc(100% - 20px);
      }
    }
  }
</style>
