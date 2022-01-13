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
    background: $e-ink-medium;
    border: 1px solid $e-ink-dark;
    padding: 5px;
    cursor: pointer;
    font-size: $font-size-extra-small;

    &:hover {
      background: $e-ink-medium;
    }
  }
</style>
