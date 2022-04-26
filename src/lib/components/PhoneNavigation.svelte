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
    <span>LEFT</span>
  </div>
  <div class="vert">
    <div
      class="key up"
      on:click={() => {
        triggerKey(KEY.UP)
      }}
    >
      <span>UP</span>
    </div>
    <div
      class="key down"
      on:click={() => {
        triggerKey(KEY.DOWN)
      }}
    >
      <span>DOWN</span>
    </div>
  </div>
  <div
    class="key right"
    on:click={() => {
      triggerKey(KEY.RIGHT)
    }}
  >
    <span>RIGHT</span>
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
    background: $e-ink-medium;
    border-top: 1px solid $e-ink-dark;
    padding: 5px;
    cursor: pointer;
    font-size: $font-size-extra-small;
    z-index: 10000;
    display: flex;
  }

  .left {
    height: 100%;
    width: 30%;
    background: $e-ink-light;
    border: 2px solid $e-ink-medium;
  }

  .right {
    height: 100%;
    width: 30%;
    background: $e-ink-light;
    border: 2px solid $e-ink-medium;
  }

  .vert {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;

    .up {
      height: 50%;
      width: 100%;
      background: $e-ink-light;
      border: 2px solid $e-ink-medium;
    }

    .down {
      height: 50%;
      width: 100%;
      background: $e-ink-light;
      border: 2px solid $e-ink-medium;
    }
  }

  .key {
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      opacity: 0.8;
    }
  }
</style>
