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
  const triggerKey = keyCode => {
    document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: keyCode }))
  }
</script>

<div class="phone-navigation">
  <div
    class="key left"
    on:click={() => {
      triggerKey(KEY.LEFT)
    }}
  >
    <span>←</span>
  </div>
  <div class="vert">
    <div
      class="key up"
      on:click={() => {
        triggerKey(KEY.UP)
      }}
    >
      <span>↑</span>
    </div>
    <div
      class="key down"
      on:click={() => {
        triggerKey(KEY.DOWN)
      }}
    >
      <span>↓</span>
    </div>
  </div>
  <div
    class="key right"
    on:click={() => {
      triggerKey(KEY.RIGHT)
    }}
  >
    <span>→</span>
  </div>
</div>

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

    &:hover,
    &:active {
      background: $e-ink-light;
    }
  }
</style>
