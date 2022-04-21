<script>
  // # # # # # # # # # # # # #
  //
  //  Person link
  //
  // # # # # # # # # # # # # #

  //  __ IMPORTS
  import { createPopper } from "@popperjs/core"
  import { onMount } from "svelte"
  import { loadDataFromMainSite, urlFor } from "$lib/modules//sanity.js"
  import { roleToRoleName } from "$lib/modules/global.js"
  import get from "lodash/get.js"

  // __ PROPS
  export let person = false
  export let overrideText = false
  export let personId = false

  // __ VARIABLES
  let linkEl = {}
  let popEl = {}
  let popper = {}
  let isDesktop = {}

  const initPopper = () => {
    popper = createPopper(linkEl, popEl, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [10, 5],
          },
        },
        { name: "eventListeners", enabled: false },
      ],
    })
  }

  const show = () => {
    if (isDesktop.matches) {
      popEl.classList.add("show")
      // Enable the event listeners
      popper.setOptions(options => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: "eventListeners", enabled: true },
        ],
      }))
      // We need to tell Popper to update the tooltip position
      // after we show the tooltip, otherwise it will be incorrect
      popper.update()
    }
  }

  const hide = () => {
    if (isDesktop.matches) {
      popEl.classList.remove("show")
      // Disable the event listeners
      popper.setOptions(options => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: "eventListeners", enabled: false },
        ],
      }))
    }
  }

  const renderNewLines = t => t.replace(/(?:\r\n|\r|\n)/g, "<br>")

  if (personId) {
    loadDataFromMainSite('*[_id == "' + personId + '"][0]').then(p => {
      person = p
      setTimeout(initPopper, 1000)
    })
  }

  onMount(async () => {
    isDesktop = window.matchMedia("(min-width: 700px)")
    if (person && isDesktop.matches) {
      initPopper()
    }
  })
</script>

{#if person}
  <a
    href={"/people/" + get(person, "slug.current")}
    bind:this={linkEl}
    sveltekit:prefetch
    on:mouseenter={show}
    on:mouseleave={hide}
  >
    {@html overrideText ? renderNewLines(overrideText) : person.title}
  </a>

  <div class="pop-up" bind:this={popEl}>
    <!-- ARROW  -->
    <!-- <div class="arrow" /> -->
    <!-- FIRST COLUMN -->
    <div class="column first">
      <!-- NAME -->
      <div class="name">{person.title}</div>
      <!-- BADGES -->
      <div class="badges">
        {#if person.role}
          <div class="badge">{roleToRoleName[person.role]}</div>
        {/if}
        {#if person.groupTags}
          {#each person.groupTags as tag}
            <div class="badge">{tag.label}</div>
          {/each}
        {/if}
      </div>
    </div>
    <!-- SECOND COLUMN -->
    <div class="column second">
      <!-- IMAGE -->
      {#if person.mainImage}
        <img
          class="image"
          alt={person.title}
          src={urlFor(person.mainImage)
            .quality(90)
            .saturation(-100)
            .width(100)
            .height(100)
            .url()}
        />
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .pop-up {
    background: $e-ink-light;
    padding: $small-margin;
    border: 1px solid $e-ink-dark;
    z-index: 1000;
    color: $e-ink-dark;
    position: relative;
    display: none;
    max-width: 360px;

    .show {
      display: block;
    }

    .arrow {
      width: 20px;
      height: 20px;
      background: $e-ink-light;
      position: absolute;
      top: -11px;
      left: 20px;
      transform: rotate(-45deg);
      border-right: 1px solid $e-ink-dark;
      border-top: 1px solid $e-ink-dark;
    }

    .name {
      font-weight: bold;
      margin-right: 10px;
    }
  }

  :global(.pop-up.show) {
    display: flex !important;
  }

  a {
    color: $e-ink-dark;
    background: $e-ink-medium;
    text-decoration: none;
    margin-bottom: 3px;
    display: inline-block;
  }

  .column {
    &.first {
      padding-right: 20px;
    }
  }
</style>
