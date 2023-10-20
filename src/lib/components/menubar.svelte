<script>
  // # # # # # # # # # # # # #
  //
  //  Menubar
  //
  // # # # # # # # # # # # # #

  // __ IMPORT
  import Clock from "$lib/components/Clock.svelte"
  import sample from "lodash/sample.js"
  import { loadDataFromMainSite } from "$lib/modules/sanity.js"
  import has from "lodash/has.js"

  // __ COMPONENTS
  import Blocks from "$lib/components/blocks/blocks.svelte"

  // __ GRAPHICS
  import FullBeam from "$lib/components/graphics/full-beam.svelte"
  import ArrowDown from "$lib/components/graphics/arrow-down.svelte"

  // __ STORES
  import { trayOpen, activeCity,activeMouse } from "$lib/modules/ui.js"

  export let currentRoom = {}

  const cities = loadDataFromMainSite('*[_id == "cities"][0]')

  cities.then(c => {
    if (c.cities && c.cities[0]) {
      activeCity.set(sample(c.cities))
    }
  })

  const toggleTray = () => {
    trayOpen.set(!$trayOpen)
  }

  const toggleMouse = () => {
    activeMouse.set(!$activeMouse)
  }
</script>

<header class:open={$trayOpen}>
  <div class="settings">
    <!-- SETTINGS BAR -->
    <div class="settings-bar" on:click={toggleTray}>
      <div class="tray-toggle" on:click={toggleTray}>
        <FullBeam black={true} />
      </div>
      Settings
    </div>
    <!-- SETTINGS CONTENT -->
    <div class="settings-content">
      <!-- THEME & INVERSION -->
      <div class="section theme" >
        <div class="section-header">Movement</div>
        <div class="mouse-switch">
          <span>Mouse</span>
          <label class="switch" >
            <input type="checkbox"on:click={toggleMouse} checked>
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <!-- TEXT -->
      <div class="section text" />
      <!-- CITY -->
      <div class="section city">
        <div class="section-header">City</div>
        {#await cities then cities}
          <div class="city-switches">
            {#each cities.cities as city}
              <div
                class="city-button"
                class:active={$activeCity._key === city._key}
                on:click={() => {
                  activeCity.set(city)
                }}
              >
                {city.name}
              </div>
            {/each}
          </div>
          <div class="city-text">
            {#if has(cities, "content.content", [])}
              <div><Blocks blocks={cities.content.content} /></div>
            {/if}
          </div>
        {/await}
      </div>
    </div>
  </div>
  <nav class="menubar">
    <div class="inner-text">
      <!-- BREADCRUMBS -->
      <div class="breadcrumbs">
        <h1><a href="/">
          open.eyebeam.org {#if currentRoom.title} / {currentRoom.title}{/if}
</a></h1>
      </div>
      <!-- TRAY TOGGLE-->
      <div class="tray-toggle" on:click={toggleTray}>
        <FullBeam />
      </div>
      <!-- CLOCK -->
      <div class="clock">
        <Clock />
      </div>
    </div>
  </nav>
</header>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  $HEADER_HEIGHT: 30px;
  h1 {
    all: unset;
  }

  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100000;
    height: 240px;
    transition: transform 0.5s $transition;
    transform: translateY(-240px);
    font-size: $font-size-extra-small;

    @include screen-size("small") {
      pointer-events: none;
    }

    &.open {
      transform: translateY(0);
    }

    .menubar {
      width: 100%;
      height: $HEADER_HEIGHT;
      background: $e-ink-dark;
      color: $e-ink-light;
      line-height: $HEADER_HEIGHT;
      padding-left: 15px;
      padding-right: 10px;
      overflow: hidden;
      border-bottom: 1px solid $e-ink-almost-dark;

      .inner-text {
        opacity: 1;

        &.loaded {
          opacity: 1;
        }
      }

      .breadcrumbs {
        float: left;
      }

      .arrow-down {
        margin-right: 5px;
      }

      .divider {
        margin-right: 5px;
        margin-left: 5px;
      }

      a {
        color: $e-ink-light;
        text-decoration: none;
      }

      .clock {
        float: right;
      }

      .tray-toggle {
        float: right;
        width: 18px;
        height: $HEADER_HEIGHT;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 12px;
        cursor: pointer;
      }
    }

    .settings {
      height: 240px;
      background: $e-ink-medium;
      color: $e-ink-dark;
      overflow: hidden;

      .settings-bar {
        height: $HEADER_HEIGHT;
        line-height: $HEADER_HEIGHT;
        padding-left: 5px;
        padding-right: 10px;
        cursor: pointer;
        border-bottom: 1px solid $e-ink-dark;
        color: $e-ink-dark;
        width: 100%;

        .tray-toggle {
          width: 18px;
          height: $HEADER_HEIGHT;
          display: flex;
          margin-right: 8px;
          justify-content: center;
          align-items: center;
          margin-left: 8px;
          cursor: pointer;
          float: left;
        }
      }

      .settings-content {
        display: flex;
        padding-left: 15px;
        padding-right: 15px;

        .section {
          padding-top: $small-margin;

          .section-header {
            margin-bottom: 10px;
          }

          &.theme {
            width: 20%;
          }
          &.text {
            width: 30%;
          }
          &.city {
            width: 50%;
          }
        }
      }
    }
  }

  .city-button {
    padding: $button-padding;
    display: inline-block;
    border-top: 1px solid $e-ink-dark;
    border-right: 1px solid $e-ink-dark;
    border-bottom: 1px solid $e-ink-dark;
    user-select: none;
    cursor: pointer;

    &:first-child {
      border-left: 1px solid $e-ink-dark;
    }

    &.active {
      background: $e-ink-dark;
      color: $e-ink-light;
    }

    &:hover {
      background: $e-ink-dark;
      color: $e-ink-light;
    }
  }

  .theme-switches {
    margin-bottom: $small-margin;
  }

  .theme-button {
    padding: $button-padding;
    display: inline-block;
    border-top: 1px solid $e-ink-dark;
    border-right: 1px solid $e-ink-dark;
    border-bottom: 1px solid $e-ink-dark;
    user-select: none;
    cursor: pointer;

    &:first-child {
      border-left: 1px solid $e-ink-dark;
    }

    &:last-child {
      margin-left: -3px;
    }

    &.active {
      background: $e-ink-dark;
      color: $e-ink-light;
    }

    &:hover {
      background: $e-ink-dark;
      color: $e-ink-light;
    }
  }

  .inversion-button {
    width: 35px;
    height: 35px;
    border: 1px solid $e-ink-dark;
    display: inline-block;
    border-radius: 50%;
    user-select: none;
    cursor: pointer;
    background: transparent;

    &:hover {
      background: $e-ink-dark;
    }

    &.active {
      background: $e-ink-dark;
    }
  }

  .city-text {
    max-width: 520px;
  }

  /* The switch - the box around the slider */
.switch {
  margin-left:5px;
  position: relative;
  display: inline-block;
  width: 30px;
  height: 15px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 0px;
  bottom: 0px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #221f20;
}

input:focus + .slider {
  box-shadow: 0 0 1px #221f20;
}

input:checked + .slider:before {
  -webkit-transform: translateX(15px);
  -ms-transform: translateX(15px);
  transform: translateX(15px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 15px;
}

.slider.round:before {
  border-radius: 50%;
}
.mouse-switch {
  display: flex;
  align-items: center;
}
</style>
