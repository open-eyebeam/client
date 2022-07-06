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

<div class="event">
  {#if post}
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
    <div class="text-container">
      {#if isUpcoming(post.startDate)}
        <div>
          <div class="upcoming">Upcoming</div>
        </div>
      {/if}
      <div class="date">{dateTimeFormat(post.startDate)}</div>
      <div class="title">{post.title}</div>
      {#if has(post, "content.content")}
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
  {/if}
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

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
