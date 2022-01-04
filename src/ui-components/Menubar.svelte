<script>
  // # # # # # # # # # # # # #
  //
  //  Menubar
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links, navigate } from "svelte-routing"
  import Clock from "./Clock.svelte"

  export let currentRoom = {}

  let selectValue = ""

  $: if (selectValue === "https://eyebeam.org") {
    window.location.href = "https://eyebeam.org"
  }
</script>

<div class="menubar" use:links>
  <!-- TITLE -->
  <div class="title">
    <select bind:value={selectValue}>
      <option value="https://open-eyebeam.netlify.app"
        >open.eyebeam.org : {currentRoom.title}</option
      >
      <option value="https://eyebeam.org">eyebeam.org</option>
    </select>
  </div>
  <!-- CLOCK -->
  <Clock />
</div>

<style lang="scss">
  @import "../variables.scss";

  .menubar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    padding-left: 7px;
    background: $black;
    z-index: 10000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    color: $white;
    font-size: $font-size-extra-small;
  }

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    display: block;
    width: 100%;
    margin: 0;
    padding: 10px;
    font-family: inherit;
    font-size: inherit;
    line-height: 1.5em;
    color: inherit;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    outline: 0;
    cursor: pointer;
    overflow: visible;
  }
</style>
