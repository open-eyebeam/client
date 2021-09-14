<script>
  // # # # # # # # # # # # # #
  //
  //  ERROR SCREEN
  //
  // # # # # # # # # # # # # #

  // *** PROPS
  export let message = ""
</script>

<div class="error-screen">
  <div class="box">
    <div class="header">ERROR: {message}</div>
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .error-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $COLOR_DARK;
    color: $COLOR_LIGHT;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;

    .box {
      font-family: $SERIF_STACK;
      padding: 20px;
      font-size: $FONT_SIZE_LARGE;
      text-align: center;
      user-select: none;
    }
  }
</style>
