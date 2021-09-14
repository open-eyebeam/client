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
  class:self
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 10 10"
  style="enable-background:new 0 0 10 10;"
  xml:space="preserve"
>
  <polygon points="5,0.6 0.4,4 2.1,9.4 7.9,9.4 9.6,4 " />
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
