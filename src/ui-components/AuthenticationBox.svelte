<script>
  // # # # # # # # # # # # # #
  //
  //  Authentication box
  //
  // # # # # # # # # # # # # #
  import {
    login,
    logout,
    isAuthenticated,
  } from "../authentication/authentication.js"
</script>

<div
  class="auth-box"
  on:click={() => {
    if (!$isAuthenticated) {
      login()
    } else {
      logout()
    }
  }}
>
  {#if $isAuthenticated}
    <!-- {#if $profileMeta.name}
    <div>
      {$profileMeta.name}
      {#if $profileMeta.roles && $profileMeta.roles.length > 0}
        {#each $profileMeta.roles as role}
          <span>({role}) </span>
        {/each}
      {/if}
    </div>
  {/if} -->
    <div>Log out</div>
  {:else}Login{/if}
</div>

<style lang="scss">
  @import "../variables.scss";

  .auth-box {
    position: fixed;
    top: 50px;
    left: 30px;
    background: $COLOR_LIGHT;
    border: 1px solid $COLOR_DARK;
    padding: 5px;
    cursor: pointer;
    font-size: $FONT_SIZE_SMALL;

    &:hover {
      background: $COLOR_MID;
    }
  }
</style>
