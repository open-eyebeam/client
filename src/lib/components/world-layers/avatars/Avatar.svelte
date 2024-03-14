<script>
  // # # # # # # # # # # # # #
  //
  //  Avatar
  //
  // # # # # # # # # # # # # #
 import { fade } from "svelte/transition"
  import { onMount } from "svelte"
  import { chatMessages } from "$lib/modules/engine.js"
  import { GRID_SIZE } from "$lib/modules/world.js"
  import { centeringInlineStyles,roomIntent, isMovingFromMouseClick } from "$lib/modules/movement.js"

  import sample from "lodash/sample.js"
  import { focusPlayer, isPhone } from "$lib/modules/ui.js"
  import {
    streams,
  } from "$lib/modules/world.js"
  // set transition time in css from this variable
  let transitionTime = 0.6 //mouseclick animation time, in seconds
  document.documentElement.style.setProperty("--avatarTransitionTime", `${transitionTime}s`)

  $: {
    let lastMessage = $chatMessages[$chatMessages.length - 1]
    if (
      lastMessage &&
      lastMessage.uuid == key &&
      Date.now() - lastMessage.timestamp < 5000
    ) {
      showMessage(lastMessage)
    }
  }

  let chatPopUp = {}
  let chatTimeOut = {}

  const showMessage = msg => {
    if (chatPopUp.popper) {
      chatPopUp.hide()
      chatPopUp.destroy()
      clearTimeout(chatTimeOut)
    }

    if (avatarEl && avatarEl.nodeName) {
      chatPopUp = tippy(avatarEl, {
        content: msg.text,
        arrow: false,
        offset: [0, 5],
        sticky: true,
        animation: "fade",
        inertia: true,
        theme: "chat",
        popperOptions: {
          modifiers: [
            {
              name: "flip",
              enabled: false,
            },
            {
              name: "preventOverflow",
              enabled: false,
            },
          ],
        },
      })

      chatPopUp.show()

      chatTimeOut = setTimeout(() => {
        chatPopUp.hide()
        setTimeout(() => {
          chatPopUp.destroy()
        }, 500)
      }, 4000)
    }
  }

  //   *** PROPS
  export let player = {}
  export let avatars = []
  export let streamRect = {}
  export let chatRect = {}
  export let key = ""

  // *** VARIABLES
  let avatarEl = {}
  let avatar = avatars.find(a => a._id === player.shape)
  if (avatar === undefined) {
    //FIXME: quickfix to make sure deleted avatars aren't gamebreaking, this case should realaunch avatar selection
    avatar = sample(avatars)
  }
  let gridPosY, gridPosX
  $: {
    gridPosY = player.y * GRID_SIZE
    gridPosX = player.x * GRID_SIZE
  }

  // Check if the local player is close to the edge of the window
  // ... and if so, center the avatar
  $: if (player.self && (player.x || player.y)) {
    if (checkIfCloseToEdge()|| checkIfCloseToObject()) {
        centerViewOnPlayer()
    }
    // Check again in a bit, for mouse movement
    setTimeout( () => {
      if (checkIfCloseToEdge()|| checkIfCloseToObject()) {
        centerViewOnPlayer()
      }
    }, 500);
  }

  const checkIfCloseToEdge = () => {
    if (avatarEl && avatarEl.parentElement) {
      let avatarRect = avatarEl.getBoundingClientRect()
      if (
        avatarRect.left < ($isPhone ? 40 : 100) ||
        avatarRect.top < ($isPhone ? 120 : 100) ||
        avatarRect.right > window.innerWidth - ($isPhone ? 40 : 100) ||
        avatarRect.bottom > window.innerHeight - ($isPhone ? 180 : 100)
      ) {
        return true
      }
    }
    return false
  }

    const checkIfCloseToObject = () => {
      if (avatarEl && avatarEl.parentElement) {
        let avatarRect = avatarEl.getBoundingClientRect()
          if ( 
            avatarRect.left < streamRect.right &&
            avatarRect.top < streamRect.bottom &&
            avatarRect.bottom > streamRect.top &&
            avatarRect.right > streamRect.left 
          ) {
            return true
          }
        if ( 
            avatarRect.left < chatRect.right &&
            avatarRect.top < chatRect.bottom &&
            avatarRect.bottom > chatRect.top &&
            avatarRect.right > chatRect.left 
          ) {
            return true
          }
        }
      return false
  }

  const centerViewOnPlayer = () => {
    centeringInlineStyles.set(
      `transform: translateX(-${gridPosX}px) translateY(-${gridPosY}px);`
    )
  }

  onMount(async () => {
  document.getElementById("room").addEventListener("click", () => {
    })

    if (!player.self) {
      tippy(avatarEl, {
        content: player.name,
        arrow: false,
        offset: [0, 5],
        theme: "name",
        hideOnClick: false,
        placement: "bottom",
        popperOptions: {
          modifiers: [
            {
              name: "flip",
              enabled: false,
            },
            {
              name: "preventOverflow",
              enabled: false,
            },
          ],
        },
      })
    }

    if (player.self) {
      // Center on player on load
      centerViewOnPlayer()
    }
  })

</script>

<div
  transition:fade
  class="avatar"
  class:shown={!$focusPlayer || player.self}
  class:self={player.self}
  class:mousemove={player.self && $isMovingFromMouseClick}
  bind:this={avatarEl}
  class:blinking={$focusPlayer && player.self}
  id={key}
  alt={player.name}
  style={"transform: translateY(" +
    gridPosY +
    "px) translateX(" +
    gridPosX +
    "px)"}
  role="uiitem"
>
  <img
    src={avatar && avatar.imageUrl ? avatar.imageUrl : sample(avatars).imageUrl}
    alt={avatar.alt}
  />
  {#if !$roomIntent}
    <div class="name">
      {player.name}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .avatar {
    height: 32px;
    width: 32px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    pointer-events: none;
//    background: $e-ink-medium;
    opacity: 0;
    .name {  
      font-size: 0.8rem;
      margin-top: -15px;
      text-align: center;
      color: $e-ink-dark;
      background: $e-ink-medium;
  }
    img {
      image-rendering: pixelated;
    }

    &.shown {
      opacity: 1;
    }

    &.blinking {
      animation: blink 0.65s infinite;
      animation-timing-function: ease-out;
    }

    &.self {
      z-index: 100000;

    }
    &.mousemove {
      transition: var(--avatarTransitionTime);
    }
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
