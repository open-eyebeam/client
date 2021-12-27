<script>
  // # # # # # # # # # # # # #
  //
  //  GRID
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
</script>

<div class="grid" transition:fade={{ duration: 200 }} />

<style lang="scss">
  @import "../variables.scss";
  .grid {
    background-image: url("/grid.png");
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.8;
  }
</style>
