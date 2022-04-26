<script>
  // # # # # # # # # # # # # #
  //
  //  Avatar Picker
  //
  // # # # # # # # # # # # # #
  import sample from "lodash/sample.js"
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let avatars = []
  let selectedAvatar = sample(avatars)._id
</script>

<div class="avatar-picker">
  <div>Select your avatar</div>
  <div class="inner">
    {#each avatars as avatar, i}
      <div
        class="avatar"
        class:selected={selectedAvatar == avatar._id}
        on:click={() => {
          selectedAvatar = avatar._id
          dispatch("select", { id: avatar._id })
        }}
      >
        <img src={avatar.imageUrl} />
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
