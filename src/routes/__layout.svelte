<script>
  // * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  //  __layout.svelte =>
  //  Contains the menubar and other interface elements.
  //  Loads index.svelte in the <slot/> component.
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * *
</script>

<!-- Content from index.svelte -->
<slot />

<style lang="scss">
  @import "src/lib/style/variables.scss";

  * {
    box-sizing: border-box;
    font-family: $SERIF_STACK;
  }

  .viewport {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    // overflow: scroll;
    opacity: 1;
    transition: transform 0.5s $transition;
    background: $e-ink-dark;

    &.pushed {
      transform: translateY(240px);
    }
  }
</style>
