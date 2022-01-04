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
    profile,
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
    <div>
      {$profile && $profile.username
        ? $profile.username + " (Log out)"
        : "Log out"}
    </div>
  {:else}Login{/if}
</div>

<style lang="scss">
  @import "../variables.scss";

  .auth-box {
    position: fixed;
    top: 40px;
    left: 20px;
    background: $white;
    padding: 5px;
    cursor: pointer;
    font-size: $font-size-extra-small;

    &:hover {
      background: $grey;
    }
  }
</style>
