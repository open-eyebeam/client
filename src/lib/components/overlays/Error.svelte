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
    <div class="header">ERROR: {@html message}</div>
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .error-screen {
   right: 20px;
    max-height:100%;
    bottom: 20px;
    position: fixed;
    width: 300px;
    z-index: 100;
    background: $e-ink-dark;
    color: $e-ink-light;
    display: flex;
    justify-content: center;
    align-items: center;
    

    .box {
      font-family: $SERIF_STACK;
      padding: 20px;
      font-size: $font-size-small;
      text-align: center;
      a {
        color: $e-ink-medium;
      }
    }
  }
</style>
