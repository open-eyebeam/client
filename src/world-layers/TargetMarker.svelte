<script>
  // # # # # # # # # # # # # #
  //
  //  Target
  //
  // # # # # # # # # # # # # #

  import { scale } from "svelte/transition"

  //   *** PROPS
  export let x = 0
  export let y = 0
</script>

<!-- transition:scale={{ duration: 500 }} -->

<div class="target" style={"top: " + y + "px; left: " + x + "px;"} />

<style lang="scss">
  @import "../variables.scss";

  .target {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background: $e-ink-dark;
    // animation: rotating 5s ease-in infinite;
    opacity: 0.2;
  }

  // @keyframes rotating {
  //   from {
  //     transform: rotate(0deg);
  //   }
  //   to {
  //     transform: rotate(360deg);
  //   }
  // }

  // @keyframes flash {
  //   50% {
  //     opacity: 0;
  //   }
  // }
</style>
