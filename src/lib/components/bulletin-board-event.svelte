<script>
  import { onMount } from "svelte"
  import has from "lodash/has.js"
  import get from "lodash/get.js"
  import truncate from "html-truncate"
  import {
    loadDataFromMainSite,
    urlForMainSite,
    urlFor,
    renderBlockText,
    renderBlockTextFromMainSite,
  } from "$lib/modules/sanity.js"
  import Blocks from "$lib/components/blocks/blocks.svelte"
  import { dateTimeFormat, isUpcoming } from "$lib/modules/utilities.js"
  export let event = {}

  let post = false
  let description = ""

  onMount(async () => {
    if (event.importEvent) {
      post = await loadDataFromMainSite(
        "*[_id == '" + event.importedEvent + "'][0]"
      )
      description = truncate(
        renderBlockTextFromMainSite(get(post, "content.content", [])),
        800
      )
    } else {
      post = event
      description = renderBlockText(get(post, "content.content", []))
    }
  })
</script>

{#if post && post.content.content[0].style != "html"}

<div class="event">
  {#if post.mainImage}
    <div class="image-container">
      <img
        class="image"
        alt={post.title}
        src={event.importEvent
          ? urlForMainSite(post.mainImage)
              .quality(90)
              .width(500)
              .height(500)
              .url()
          : urlFor(post.mainImage).quality(90).width(500).height(500).url()}
      />
    </div>
    {/if}
    <div class="text-container">
      {#if post.startDate && isUpcoming(post.startDate)}
        <div>
          <div class="upcoming">Upcoming</div>
        </div>
      {/if}
    {#if post.startDate}
      <div class="date">{dateTimeFormat(post.startDate)}</div>
      {/if}
      <div class="title">{post.title}</div>
      {#if has(post, "content.content") && post.content.content[0].style != "html"}
        <div class="description">
          {@html description}
        </div>
      {/if}
      {#if event.importEvent}
        <div class="link-to-full">
          <a
            href={"https://eyebeam.netlify.app/events/" +
              get(post, "slug.current")}
            target="_blank"
          >
            More Information Here
          </a>
        </div>
      {/if}
    </div>
</div>
  {/if}

    {#if has(post, "content.content") && post.content.content[0].style == "html"}
    <div class="html-container">
      <h3>Messages</h3>
      <Blocks blocks={post.content.content} />
    </div>
    {/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";
    .html-container {
      width: 100%;
      min-height: 200px;
    }

  h3 {
    margin: 0;
    text-align: center;
  }
  .event {
    display: flex;
    margin-bottom: 40px;
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

      .upcoming {
        background: $e-ink-light;
        color: $e-ink-dark;
        margin-bottom: 0.5em;
        display: inline-block;
      }

      .title {
        margin-bottom: 2em;
      }
    }
  }
</style>
