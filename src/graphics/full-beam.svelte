<script>
  // # # # # # # # # # # # # #
  //
  //  FULL BEAM
  //
  // # # # # # # # # # # # # #

  export let black = false
</script>

<svg
  class:black
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 18 18"
  style="enable-background:new 0 0 18 18;"
  xml:space="preserve"
>
  <path
    class="st1"
    d="M0,8.8h6.8 M16.8,4.4l-5.9,3.3L16.8,4.4z M13.6,1.2l-3.4,5.7L13.6,1.2z M11.1,8.8H18 M1.2,4.4l5.9,3.3L1.2,4.4z M4.4,1.2l3.4,5.7L4.4,1.2z M9,0v6.6V0z"
  />
  <path
    class="st1"
    d="M1.2,13.1l5.9-3.3 M4.4,16.3l3.4-5.7 M16.8,13.1l-5.9-3.3 M13.6,16.3l-3.4-5.7 M9,17.4v-6.6"
  />
</svg>

<style type="scss">
  @import "../variables.scss";

  svg {
    width: 100%;
    path {
      fill: none;
      stroke: $e-ink-light;
      stroke-width: 0.75;
      stroke-miterlimit: 10;
    }

    &.black {
      path {
        stroke: $e-ink-dark;
      }
    }
  }
</style>
