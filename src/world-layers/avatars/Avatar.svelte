<script>
  // # # # # # # # # # # # # #
  //
  //  Avatar
  //
  // # # # # # # # # # # # # #
  import { fly, scale, fade } from "svelte/transition"
  import { onMount, onDestroy } from "svelte"
  import { chatMessages } from "../../core/core.js"
  import get from "lodash/get"
  import sample from "lodash/sample"
  import { GRID_SIZE } from "../../data.js"

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
      // console.log("Show message:", msg)
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

      // console.log(chatPopUp)

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
  export let key = ""

  // *** VARIABLES
  let avatarEl = {}
  const avatar = avatars.find(a => a._id === get(player, "avatar._ref", ""))
  let gridPosY = player.y * GRID_SIZE
  let gridPosX = player.x * GRID_SIZE

  $: {
    gridPosY = player.y * GRID_SIZE
    gridPosX = player.x * GRID_SIZE
  }

  // $: {
  //   console.log("gridPosY", player.y, gridPosY)
  //   console.log("gridPosX", player.x, gridPosX)
  // }

  onMount(async () => {
    // console.log("player", player)
    // console.log("player.name", player.name)
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
  })
</script>

<div
  transition:scale
  class="avatar"
  class:self={player.self}
  bind:this={avatarEl}
  id={key}
  alt={player.name}
  style={"transform: translateY(" +
    gridPosY +
    "px) translateX(" +
    gridPosX +
    "px)"}
>
  <img
    src={avatar && avatar.imageUrl ? avatar.imageUrl : sample(avatars).imageUrl}
  />
</div>

<style lang="scss">
  @import "../../variables.scss";

  .avatar {
    height: 32px;
    width: 32px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    // transition: transform 0.1s linear;
    background: $e-ink-medium;

    img {
      width: 100%;
      height: 100%;
      image-rendering: pixelated;
    }

    &.self {
      z-index: 100000;
    }
  }
</style>
