<script>
  // # # # # # # # # # # # # #
  //
  //  Avatar
  //
  // # # # # # # # # # # # # #
  import { scale } from "svelte/transition"
  import { onMount } from "svelte"
  import { chatMessages } from "$lib/modules/core.js"
  import { GRID_SIZE } from "$lib/modules/data.js"
  import get from "lodash/get.js"
  import sample from "lodash/sample.js"

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
  export let key = ""

  // *** VARIABLES
  let avatarEl = {}
  // let avatar = avatars.find(a => a._id === get(player, "avatar._ref", ""))
  let avatar = avatars.find(a => a._id === player.shape)
  let gridPosY = player.y * GRID_SIZE
  let gridPosX = player.x * GRID_SIZE

  $: {
    gridPosY = player.y * GRID_SIZE
    gridPosX = player.x * GRID_SIZE
  }

  onMount(async () => {
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
  @import "src/lib/style/variables.scss";

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
