<script>
  import { onMount } from "svelte"
  import has from "lodash/has.js"
  import {
    loadDataFromMainSite,
    urlForMainSite,
    urlFor,
  } from "$lib/modules/sanity.js"
  import Blocks from "$lib/components/blocks/blocks.svelte"
  import { dateTimeFormat } from "$lib/modules/global.js"
  export let event = {}

  let post = false
  onMount(async () => {
    if (event.importEvent) {
      post = await loadDataFromMainSite(
        "*[_id == '" + event.importedEvent + "'][0]"
      )
    } else {
      post = event
    }
  })
</script>

<div class="event">
  {#if post}
    <div class="image-container">
      <img
        class="image"
        alt={post.title}
        src={event.importEvent
          ? urlForMainSite(post.mainImage)
              .quality(90)
              .saturation(-100)
              .width(500)
              .height(500)
              .url()
          : urlFor(post.mainImage)
              .quality(90)
              .saturation(-100)
              .width(500)
              .height(500)
              .url()}
      />
    </div>
    <div class="text-container">
      <div class="date">{dateTimeFormat(post.startDate)}</div>
      <div class="title">{post.title}</div>
      {#if has(post, "content.content")}
        <div class="description">
          <Blocks blocks={post.content.content} mainSite={event.importEvent} />
        </div>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .event {
    display: flex;
    margin-bottom: 20px;
    min-height: 200px;

    .image-container {
      width: 50%;

      img {
        max-width: 100%;
      }
    }

    .text-container {
      padding-left: 10px;
      width: 50%;

      .date {
        background: $e-ink-dark;
        color: $e-ink-light;
        margin-bottom: 1em;
        display: inline-block;
      }

      .title {
        margin-bottom: 1em;
      }
    }
  }
</style>
