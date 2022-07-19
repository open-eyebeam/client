<script>
  // # # # # # # # # # # # # #
  //
  //  Avatar Picker
  //
  // # # # # # # # # # # # # #
  import { onMount } from "svelte"
  import sample from "lodash/sample.js"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let avatars = []
  let selectedAvatar = sample(avatars)._id

  onMount(async () => {
    dispatch("select", { id: selectedAvatar })
  })
  const selectAvatar = (avatar) => {
    selectedAvatar = avatar._id
    dispatch("select", { id: avatar._id })

  }
</script>

<div class="avatar-picker">
  <div>Select your avatar</div>
  <div class="inner">
    {#each avatars as avatar, i}
      <div
        class="avatar"
        class:selected={selectedAvatar == avatar._id}
        on:click={selectAvatar(avatar)}
    on:keydown={e => e.key === "Enter" && selectAvatar(avatar)}
        tabindex="0"
      >
        <img src={avatar.imageUrl} alt={avatar.alt} />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .inner {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .avatar {
      cursor: pointer;
      padding: 5px;
      border: 2px solid transparent;
      border-radius: 5px;

      @include screen-size("small") {
        padding: 10px;
      }

      &.selected {
        border: 2px solid $e-ink-dark;
      }
    }
  }
</style>
