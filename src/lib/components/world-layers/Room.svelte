<script>
  import { centeringInlineStyles } from "$lib/modules/movement.js"
  export let room = {}
</script>

<div
  class="room"
  id="room"
  style={`${room.inlineStyles} ${$centeringInlineStyles}`}
>
  <slot />
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";
  .room {
    position: absolute;
    top: 50%;
    left: 50%;
    background: $e-ink-medium;
    will-change: transform;
    transition: transform 0.5s ease-out;
  }
</style>
