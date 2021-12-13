<script>
  // # # # # # # # # # # # # #
  //
  //  ONBOARDING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { cubicOut } from "svelte/easing"
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  const makeProgress = () => {
    onboardingProgress++
  }

  const finishOnboarding = () => {
    dispatch("onboard", { username: username, shape: shape })
  }

  const transitionSettings = { duration: 500 }

  //   *** VARIABLES
  let username = ""
  let shape = "square"
  let onboardingProgress = 0
</script>

<div class="onboarding-container">
  <!-- 000 -->
  {#if onboardingProgress === 0}
    <div
      class="caption-box"
      in:fade={transitionSettings}
      on:click={makeProgress}
    >
      Welcome to Open Eyebeam ▸
    </div>
  {/if}

  <!-- 111 -->
  {#if onboardingProgress === 1}
    <div
      class="caption-box"
      in:fade={transitionSettings}
      on:click={makeProgress}
    >
      You’re about to enter Eyebeam’s special gathering space ▸
    </div>
  {/if}

  <!-- 222 -->
  {#if onboardingProgress === 2}
    <div
      class="caption-box"
      in:fade={transitionSettings}
      on:click={makeProgress}
    >
      What would you like to be called here?
    </div>

    <div class="caption-box text-input" in:fade={transitionSettings}>
      <input
        class="name"
        type="text"
        placeholder="(enter name)"
        autofocus
        bind:value={username}
        on:keydown={e => {
          if (e.code === "Enter") {
            makeProgress()
          }
        }}
      />
      <button class="submit-name" on:click={makeProgress}>▸</button>
    </div>
  {/if}

  <!-- 333 -->
  {#if onboardingProgress === 3}
    <div class="caption-box" in:fade={transitionSettings}>
      What shape do you want to be?
    </div>
    <div class="caption-box" in:fade={transitionSettings}>
      <div class="btn-group" role="button">
        <div
          class="choice"
          tabindex="0"
          autofocus
          on:click={() => {
            shape = "triangle"
            makeProgress()
          }}
          on:keydown={e => {
            if (e.code === "Enter") {
              shape = "triangle"
              makeProgress()
            }
          }}
        >
          <div class="marker">▸</div>
          Triangle
        </div>
        <div
          class="choice"
          tabindex="0"
          on:click={() => {
            shape = "square"
            makeProgress()
          }}
          on:keydown={e => {
            if (e.code === "Enter") {
              shape = "square"
              makeProgress()
            }
          }}
        >
          <div class="marker">▸</div>
          Square
        </div>
        <div
          class="choice"
          tabindex="0"
          on:click={() => {
            shape = "pentagon"
            makeProgress()
          }}
          on:keydown={e => {
            if (e.code === "Enter") {
              shape = "pentagon"
              makeProgress()
            }
          }}
        >
          <div class="marker">▸</div>
          Pentagon
        </div>
        <div
          class="choice"
          tabindex="0"
          on:click={() => {
            shape = "hexagon"
            makeProgress()
          }}
          on:keydown={e => {
            if (e.code === "Enter") {
              shape = "hexagon"
              makeProgress()
            }
          }}
        >
          <div class="marker">▸</div>
          Hexagon
        </div>
        <div
          class="choice"
          tabindex="0"
          on:click={() => {
            shape = "star"
            makeProgress()
          }}
          on:keydown={e => {
            if (e.code === "Enter") {
              shape = "star"
              makeProgress()
            }
          }}
        >
          <div class="marker">▸</div>
          Star
        </div>
      </div>
    </div>
  {/if}

  <!-- 444 -->
  {#if onboardingProgress === 4}
    <div class="caption-box" in:fade={transitionSettings}>
      Are you ready to enter?
    </div>
    <div class="caption-box" in:fade={transitionSettings}>
      <div
        class="choice"
        tabindex="0"
        autofocus
        on:click={finishOnboarding}
        on:keydown={e => {
          if (e.code === "Enter") {
            finishOnboarding()
          }
        }}
      >
        <div class="marker">▸</div>
        Yes
      </div>
      <div class="choice" tabindex="0">
        <div class="marker">▸</div>
        No
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../variables.scss";

  .onboarding-container {
    position: fixed;
    bottom: 50px;
    left: 50px;
    z-index: 1000;
  }

  .caption-box {
    padding: 15px;
    background: #e8eae6;
    color: $COLOR_DARK;
    border: 1px solid $COLOR_DARK;
    cursor: pointer;
    user-select: none;
    font-size: $FONT_SIZE_BASE;
    margin-top: 0.5em;

    &.text-input {
      display: flex;
      justify-content: space-between;
    }
  }

  .name {
    background: transparent;
    border: none;
    outline: none;
    font-size: $FONT_SIZE_BASE;
    font-family: $SERIF_STACK;
    width: 200px;
  }

  .submit-name {
    width: 60px;
    border-radius: 0;
    border: 1px solid $COLOR_DARK;
    cursor: pointer;

    &:hover {
      background: $COLOR_MID;
    }
  }

  .choice {
    display: flex;

    .marker {
      opacity: 0;
      width: 1em;
      text-align: center;
    }

    &:hover,
    &:focus {
      .marker {
        opacity: 1;
      }
    }
  }
</style>
