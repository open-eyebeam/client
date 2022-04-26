<script>
  // # # # # # # # # # # # # #
  //
  //  ANIMATED BEAM
  //
  // # # # # # # # # # # # # #

  import { onMount } from "svelte"
  import TWEEN from "@tweenjs/tween.js"

  const EASING = TWEEN.Easing.Cubic.Out

  let counter = {
    value: 1,
  }
  let pos = 1

  const tween = new TWEEN.Tween(counter) // Create a new tween that modifies 'coords'.
    .to({ value: 20 }, 1500) // Move to (300, 200) in 1 second.
    .easing(EASING) // Use an easing function to make the animation smooth.
    .onUpdate(() => {
      pos = counter.value
    })

  const animate = () => {
    TWEEN.update()
    requestAnimationFrame(animate)
  }

  onMount(async () => {
    window.setTimeout(() => {
      tween.start() // Start the tween immediately.
      animate()
    }, 500)
  })
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139.98 67.2">
  <line class="l-1" class:shown={pos > 1} y1="66.95" x2="53.24" y2="66.95" />
  <path class="l-2" class:shown={pos > 2} d="M.82,55.05,53.28,63.8Z" />
  <path class="l-3" class:shown={pos > 3} d="M3.8,43.85l50,17.25Z" />
  <path class="l-4" class:shown={pos > 4} d="M8.93,33.26,55.05,58.44Z" />
  <path class="l-5" class:shown={pos > 5} d="M16.05,24,56.86,56.4Z" />
  <path class="l-6" class:shown={pos > 6} d="M24.12,16,58.33,54.56Z" />
  <path class="l-7" class:shown={pos > 7} d="M34.3,9.1,60.92,52.76Z" />
  <path class="l-8" class:shown={pos > 8} d="M45.65,4.12l18.2,47.33Z" />
  <path class="l-9" class:shown={pos > 9} d="M57.12,1,66.4,50.64Z" />
  <line class="l-10" class:shown={pos > 10} x1="69.63" y1="50.35" x2="69.63" />
  <path class="l-11" class:shown={pos > 11} d="M82.84,1,73.6,50.64Z" />
  <path class="l-12" class:shown={pos > 12} d="M94.35,4.12,76.15,51.45Z" />
  <path class="l-13" class:shown={pos > 13} d="M105.7,9.1,79.08,52.76Z" />
  <path class="l-14" class:shown={pos > 14} d="M115.84,16,81.63,54.56Z" />
  <path class="l-15" class:shown={pos > 15} d="M124,24,83.14,56.4Z" />
  <path class="l-16" class:shown={pos > 16} d="M131.07,33.26,85,58.44Z" />
  <path class="l-17" class:shown={pos > 17} d="M136.2,43.85l-50,17.25Z" />
  <path class="l-18" class:shown={pos > 18} d="M139.18,55.05,86.72,63.8Z" />
  <line
    class="l-19"
    class:shown={pos > 19}
    x1="86.74"
    y1="66.95"
    x2="139.98"
    y2="66.95"
  />
</svg>

<style type="scss">
  @import "src/lib/style/variables.scss";

  svg {
    height: 90%;
    path,
    line {
      fill: none;
      stroke: $e-ink-dark;
      stroke-width: 0.7px;
      stroke-miterlimit: 10;
      opacity: 0;

      &.shown {
        opacity: 1;
      }
    }
  }
</style>
