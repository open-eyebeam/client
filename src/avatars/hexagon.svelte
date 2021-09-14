<script>
  // # # # # # # # # # # # # #
  //
  //  Avatar
  //
  // # # # # # # # # # # # # #

  //   *** PROPS
  export let self = false
</script>

<svg
  version="1.1"
  id="Layer_1"
  class:self
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 10 10"
  style="enable-background:new 0 0 10 10;"
  xml:space="preserve"
>
  <polygon points="7.3,1 2.7,1 0.3,5 2.7,9 7.3,9 9.7,5 " />
</svg>

<style lang="scss">
  @import "../variables.scss";

  svg {
    polygon,
    rect {
      fill: none;
      stroke: $COLOR_DARK;
      stroke-width: 0.5;
      stroke-miterlimit: 10;
    }

    &.self {
      polygon,
      rect {
        fill: $COLOR_DARK;
      }
    }

    &:hover {
      polygon,
      rect {
        fill: $COLOR_LIGHT;
      }
    }
  }
</style>
