<script>
  // # # # # # # # # # # # # #
  //
  //  Phone Navigation
  //
  // # # # # # # # # # # # # #

  const KEY = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
  }
  let nodeUp, nodeDown, nodeLeft, nodeRight;
  let active;
  function triggerKey(node, keyCode) {
    // send it once
      document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: keyCode }))
    //then keep sending it to they stop pressing
      const timeout = setInterval(()=> document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: keyCode })), 150);
      active = node
      function cancel() {
        clearInterval(timeout)
        active = ''
        node.removeEventListener("touchend", cancel, false)
      }
      node.addEventListener("touchend", cancel, false)
  }
</script>



<style lang="scss">
  @import "src/lib/style/variables.scss";

  .phone-navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 120px;
    backdrop-filter: blur(10px);
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
    font-size: $font-size-medium;
    z-index: 10000;
    display: flex;
    user-select: none;
  }

  .left {
    height: calc(100% - 10px);
    width: calc(30% - 10px);
    background: $e-ink-medium;
    border: 1px solid $e-ink-dark;
    margin: 5px;
  }

  .right {
    height: calc(100% - 10px);
    width: calc(30% - 10px);
    background: $e-ink-medium;
    border: 1px solid $e-ink-dark;
    margin: 5px;
  }

  .vert {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;

    .up {
      height: calc(50% - 10px);
      width: calc(100% - 10px);
      background: $e-ink-medium;
      border: 1px solid $e-ink-dark;
      margin: 5px;
      span {
        margin-bottom: 10px;
      }
    }

    .down {
      height: calc(50% - 10px);
      width: calc(100% - 10px);
      background: $e-ink-medium;
      border: 1px solid $e-ink-dark;
      margin: 5px;
      span {
        margin-bottom: 10px;
      }
    }
  }

  .key {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    &:hover,
    &.active {
      background: $e-ink-light;
    }
  }
</style>
