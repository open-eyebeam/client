<script>
  // # # # # # # # # # # # # #
  //
  //  Menubar
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links, navigate } from "svelte-routing"
  import Clock from "./sidebar/Clock.svelte"

  // *** STORES
  // import {
  //   localUserAuthenticated,
  //   authenticatedUserInformation,
  // } from "../stores"
</script>

<div class="menubar" use:links>
  <div class="title">open.eyebeam.org</div>
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
    background: rgb(30, 30, 30);
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
    color: white;
  }
</style>
