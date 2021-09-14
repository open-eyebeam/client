<script>
  // # # # # # # # # # # # # #
  //
  //  Menubar
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links, navigate } from "svelte-routing"
  import Clock from "./Clock.svelte"

  // *** STORES
  import { currentArea } from "./stores.js"
</script>

<div class="menubar" use:links>
  <div class="title">open.eyebeam.org : {$currentArea}</div>
  <Clock />
</div>

<style lang="scss">
  @import "./variables.scss";

  .menubar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    padding-left: 7px;
    background: $COLOR_DARK;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
    color: $COLOR_LIGHT;
    font-size: $FONT_SIZE_SMALL;
  }
</style>
