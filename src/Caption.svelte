<script>
  // # # # # # # # # # # # # #
  //
  //  CAPTION BOX
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
</script>

<div class="caption-box" transition:fade>
  Welcome to the Field... The grass is swaying in the wind.
</div>

<style lang="scss">
  @import "./variables.scss";

  .caption-box {
    position: fixed;
    bottom: 30px;
    left: 30px;
    padding: 15px;
    background: #e8eae6;
    color: rgb(30, 30, 30);
    border: 1px solid rgb(30, 30, 30);
    z-index: 1000;
  }
</style>
