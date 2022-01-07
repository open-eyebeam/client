<script>
  // # # # # # # # # # # # # #
  //
  //  SEARCH ICON
  //
  // # # # # # # # # # # # # #

  export let white = false
</script>

<svg
  class:white
  width="12"
  height="13"
  viewBox="0 0 12 13"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M11.2998 11.6992L7.2998 7.69922" stroke-width="2" />
  <path
    d="M5 9C7.20914 9 9 7.20914 9 5C9 2.79086 7.20914 1 5 1C2.79086 1 1 2.79086 1 5C1 7.20914 2.79086 9 5 9Z"
    stroke-width="2"
  />
</svg>

<style lang="scss">
  @import "../variables.scss";

  svg {
    path {
      stroke: $e-ink-dark;
    }

    &.white {
      path {
        stroke: $e-ink-light;
      }
    }
  }
</style>
