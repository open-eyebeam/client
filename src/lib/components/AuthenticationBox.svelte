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
  } from "$lib/modules/authentication.js"
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
      {$profile && $profile.name ? $profile.name + " (Log out)" : "Log out"}
    </div>
  {:else}Login{/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .auth-box {
    position: fixed;
    top: 40px;
    right: 10px;
    background: $e-ink-medium;
    border: 1px solid $e-ink-dark;
    cursor: pointer;
    font-size: $font-size-extra-small;
    z-index: 10000;
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 27px;

    @include screen-size("small") {
      display: none;
    }

    &:hover {
      opacity: 0.8;
    }
  }
</style>
