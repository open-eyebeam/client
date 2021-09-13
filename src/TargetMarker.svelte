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

<div
  transition:scale={{ duration: 500 }}
  class="target"
  style={"top: " + y + "px; left: " + x + "px;"}
/>

<style lang="scss">
  @import "./variables.scss";

  .target {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(33, 33, 33, 0.4);
    // animation: flash 0.5s linear infinite;
  }

  @keyframes flash {
    50% {
      opacity: 0;
    }
  }
</style>
