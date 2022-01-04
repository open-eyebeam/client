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
  <polygon
    points="5,2.3 7.7,0.8 7.2,3.9 9.4,6 6.3,6.4 5,9.2 3.7,6.4 0.6,6 2.8,3.9 2.3,0.8 "
  />
</svg>

<style lang="scss">
  @import "../../variables.scss";

  svg {
    cursor: pointer;

    polygon,
    rect {
      fill: none;
      stroke: $black;
      stroke-width: 0.5;
      stroke-miterlimit: 10;
    }

    &:hover {
      polygon,
      rect {
        fill: $white;
      }
    }

    &.self {
      cursor: default;
      polygon,
      rect {
        fill: $black;
      }

      &:hover {
        polygon,
        rect {
          fill: $black;
        }
      }
    }
  }
</style>
