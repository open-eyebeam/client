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
  @import "../../variables.scss";

  svg {
    cursor: pointer;

    polygon,
    rect {
      fill: none;
      stroke: $e-ink-dark;
      stroke-width: 0.5;
      stroke-miterlimit: 10;
    }

    &:hover {
      polygon,
      rect {
        fill: $e-ink-light;
      }
    }

    &.self {
      cursor: default;
      polygon,
      rect {
        fill: $e-ink-dark;
      }

      &:hover {
        polygon,
        rect {
          fill: $e-ink-dark;
        }
      }
    }
  }
</style>
