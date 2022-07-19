<script>
  // # # # # # # # # # # # # #
  //
  //  ONBOARDING SCREEN
  //
  // # # # # # # # # # # # # #
  import { onMount } from "svelte"
  import { isMobileOrTablet} from "$lib/modules/utilities.js"
  import { loadOnboardingTutorial } from "$lib/modules/world.js"
  import { renderBlockText } from "$lib/modules/sanity.js"
  import get from "lodash/get.js"
  import AvatarPicker from "$lib/components/AvatarPicker.svelte"
  import { isPhone } from "$lib/modules/ui.js" 
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let avatars = []

    isPhone.set(isMobileOrTablet())

  let onboardingTutorial = {}
  let slides = false
  let slideIndex = 0
  let name = ""
  let avatar = ""

  const nextSlide = () => slideIndex++
  const finish = () => {
    dispatch("finish", { name, avatar })
  }

  onMount(async () => {
    onboardingTutorial = await loadOnboardingTutorial()
    slides = onboardingTutorial.tutorialSlides
  })
</script>

<div class="onboarding-screen">
  <div class="box">
    <!-- TUTORIAL SLIDES -->
    {#if slides}
      {#each slides as slide, i}
        {#if i === slideIndex}
          <div class="slide" on:keydown={e => e.key === "Enter" && nextSlide()} aria-live="polite" tabindex="0">
            {@html renderBlockText(get(slide, "content.content", []))}
            {#if i === slides.length-1 && $isPhone}
            <p><strong>This website is best experienced on a laptop or desktop computer. Some content may not be accessible on phones or tablets.</strong></p>
            {/if}
            <button class="btn next" on:click={nextSlide} on:keydown={e => e.key === "Enter" && nextSlide}>Next</button>
            </div>
        {/if}
      {/each}
    {/if}
    <!-- NAME -->
    {#if slideIndex === slides.length}
      <div class="slide" on:keydown={e => e.key === "Enter" && nextSlide()} aria-live="polite" tabindex="0">
        <div class="name">What would you like to be called?</div>
        <div class="input-container">
          <input
            class="name"
            type="text"
            placeholder="Name"
            bind:value={name}
            autofocus
            minlength="1"
            on:keydown={e => e.key === "Enter" && nextSlide()}
          />
        </div>
        <button class="btn next" on:keydown={e => e.key === "Enter" && nextSlide()} on:click={nextSlide} tabindex="0">Next</button>
      </div>
    {/if}
    <!-- AVATAR -->
    {#if slideIndex === slides.length + 1}
      <div class="slide" on:keydown={e => e.key === "Enter" && finish()} aria-live="polite" tabindex="0">
        <div class="name">
          <AvatarPicker
            {avatars}
            on:select={e => {
              avatar = e.detail.id
            }}
          />
        </div>
        <div class="btn next" on:click={finish}>Enter</div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .onboarding-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: $e-ink-light;
    // background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;
    backdrop-filter: blur(10px);

    .box {
      font-family: $SERIF_STACK;
      padding: 40px;
      width: 400px;
      background: $e-ink-light;
      color: $e-ink-dark;
      font-size: $font-size-small;
      text-align: center;
      user-select: none;
        max-width: 90%;
      }
    }
    button {
      	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
outline: inherit;    
}
  .btn {
    width: 100%;
    background: $e-ink-medium;
    padding: 10px;
    margin-top: 20px;
    cursor: pointer;
    border: 1px solid $e-ink-dark;
    &:hover {
      opacity: 0.8;
    }
  }

  .name {
    margin-top: 10px;
    width: 100%;
    padding: 5px;
    font-size: $font-size-small;
    text-align: center;
    outline: none;
    font-family: $SERIF_STACK;
  }
</style>
