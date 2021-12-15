<script>
  // # # # # # # # # # # # # #
  //
  //  Avatar
  //
  // # # # # # # # # # # # # #
  import { fly, scale, fade } from "svelte/transition"
  import { onMount, onDestroy } from "svelte"
  import { chatMessages } from "../../core/core.js"

  // $: console.log(
  //   key,
  //   $chatMessages.filter(m => m.uuid == key)
  // )

  $: {
    let lastMessage = $chatMessages[$chatMessages.length - 1]
    if (lastMessage.uuid == key && Date.now() - lastMessage.timestamp < 5000) {
      // console.log("new message", key)
      // console.log(lastMessage)
      // console.log(lastMessage.timestamp)
      // console.log(Date.now())
      // console.log(Date.now() - lastMessage.timestamp)
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

    if (avatarEl) {
      // console.log("Show message:", msg)
      chatPopUp = tippy(avatarEl, {
        content: msg.text,
        arrow: false,
        offset: [0, 5],
        sticky: true,
        animation: "fade",
        inertia: true,
        theme: "chat",
        // offset: [10, 10],
        //   hideOnClick: false,
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

  // *** GRAPHICS
  import Square from "./square.svelte"
  import Star from "./star.svelte"
  import Triangle from "./triangle.svelte"
  import Pentagon from "./pentagon.svelte"
  import Hexagon from "./hexagon.svelte"

  //   *** PROPS
  export let player = {}
  export let key = ""

  let avatarEl = {}

  // console.log("player", player)

  onMount(async () => {
    // console.log("player", player)
    // console.log("player.name", player.name)
    if (!player.self) {
      tippy(avatarEl, {
        content: key,
        arrow: false,
        offset: [0, 10],
        followCursor: true,
        //   showOnCreate: true,
        sticky: true,
        theme: "name",
        //   hideOnClick: false,
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
    player.y +
    "px) translateX(" +
    player.x +
    "px)"}
>
  {#if player.shape === "square"}
    <Square self={player.self} />
  {/if}
  {#if player.shape === "triangle"}
    <Triangle self={player.self} />
  {/if}
  {#if player.shape === "hexagon"}
    <Hexagon self={player.self} />
  {/if}
  {#if player.shape === "pentagon"}
    <Pentagon self={player.self} />
  {/if}
  {#if player.shape === "star"}
    <Star self={player.self} />
  {/if}
</div>

<style lang="scss">
  @import "../../variables.scss";

  .avatar {
    height: 30px;
    width: 30px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    transition: transform 0.1s linear;
  }
</style>
