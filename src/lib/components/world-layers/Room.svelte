<script>
  import { centeringInlineStyles } from "$lib/modules/movement.js"
  import { onMount } from 'svelte'
  import { GRID_SIZE } from "$lib/modules/world.js";
  export let room = {}
  export let players; 
  export let localPlayer;

  // LEAVING THIS HERE FOR THE FUTURE: needs to be same-origin iframe to do this
  // trying to do some crazy shit for peter's studio
  //onMount(async => {
  //console.log('foo')
  //FIXME named this variable confusingly, if iframeInteraction == true then disable iframe interaction lol
  //if (room.iframeInteraction == true) {}

  //console.log('iframe interaction disabled')
  //waitForElement('#bg-iframe').then( el => {
  //    console.log('el', el)
  //    el.addEventListener("load", () => {
  //      el.addEventListener("keydown", e => {
  //        console.log('key press')
  //        e.preventDefault()
  //        return
  //      }, true)      
  //      console.log('should be clicking it')
  //      el.contentWindow.document.dispatchEvent(new MouseEvent("click", {clientX: 20, clientY: 20}))
  //      window.setTimeout(() => {
  //        console.log('should be clicking it again')
  //        el.contentWindow.document.dispatchEvent(new MouseEvent("click", {clientX: 45, clientY: 20}))
  //        el.style.cssText += "pointer-events:none;"
//}, 10000)
    //})
  //})
  
   //       }) 
  onMount(async () => {
  var roomElement = document.getElementById("room");
  roomElement.addEventListener("click", function (event) {
    players.update((ps) => {
      ps[localPlayer.uuid].y = event.offsetY/ GRID_SIZE;
      ps[localPlayer.uuid].x = event.offsetX/ GRID_SIZE;
      return ps;
    });
  });
})

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
  {#if room.backgroundLink}
    <iframe id="bg-iframe" src={room.backgroundLink} />
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
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
</style>
