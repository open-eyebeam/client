<script>
  import { centeringInlineStyles } from "$lib/modules/movement.js"
  export let room = {}
</script>

<div
  class="room"
  id="room"
  style={`${room.inlineStyles} ${$centeringInlineStyles}`}
  aria-live="polite"
>
  <slot />

  {#if room.bgVideoUrl}
    <video src={room.bgVideoUrl} autoplay loop muted />
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";
  .room {
    position: absolute;
    top: 50%;
    left: 50%;
    background: $e-ink-medium;
    background-repeat: no-repeat;
    background-size: cover;
    will-change: transform;
    transition: transform 0.5s ease-out;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
