<script>
  // # # # # # # # # # # # # #
  //
  //  MAIN CONTENT
  //
  // # # # # # # # # # # # # #

  // __ IMPORTS
  import has from "lodash/has.js"
  import { urlFor } from "$lib/modules/sanity.js"
  import { dateTimeFormat, longFormatDate } from "$lib/modules/utilities.js"

  // __ COMPONENTS
  import Blocks from "$lib/components/blocks/blocks.svelte"
  import SeeAlso from "$lib/components/see-also.svelte"
  import PersonLink from "$lib/components/person-link.svelte"

  // __ GRAPHICS
  import ExternalLink from "$lib/components/graphics/external-link.svelte"

  // *** PROPS
  export let page

  const BOXED_TYPES = ["program", "note"]
  let boxed = BOXED_TYPES.includes(page._type) ? true : false

  const INTRO_TYPES = ["program", "note"]
  let showIntroduction = INTRO_TYPES.includes(page._type) ? true : false

  const TIGHT_TYPES = ["artists", "event", "eyebeamIsChanging", "news", "press"]
  let tight = TIGHT_TYPES.includes(page._type) ? true : false

  const PEOPLE_TYPES = ["event"]
  let showPeople = PEOPLE_TYPES.includes(page._type) ? true : false
</script>

<div class="main-content">
  <div class="article">
    <div class="header" class:boxed class:tight>
      <!-- TITLE -->
      <h1>{page.title}</h1>

      {#if page._type == "note"}
        <!-- DATE -->
        <div class="date">
          {dateTimeFormat(page._createdAt)}
        </div>
        <!-- AUTHOR(S) -->
        {#if page.people && page.people.length > 0}
          <div class="authors">
            by {#each page.people as person}
              <PersonLink {person} />
            {/each}
          </div>
        {/if}
      {/if}

      <!-- INTRODUCTION -->
      {#if showIntroduction && has(page, "introduction.content", [])}
        <div><Blocks blocks={page.introduction.content} /></div>
      {/if}

      <!-- MAIN IMAGE -->
      {#if !showIntroduction && page.mainImage}
        <figure class="image-container">
          <img
            class="main-image"
            alt={page.title}
            src={urlFor(page.mainImage).quality(90).width(400).url()}
          />
          {#if has(page, "mainImage.caption.content")}
            <figcaption>
              <Blocks blocks={page.mainImage.caption.content} />
            </figcaption>
          {/if}
        </figure>
      {/if}
    </div>

    <!-- EVENT INFO -->
    {#if page._type === "event"}
      <div class="event-info">
        {#if page.startDate}
          <div class="dates">
            <h3>Dates</h3>
            {longFormatDate(page.startDate)}
          </div>
        {/if}
        {#if has(page, "location.content")}
          <div class="location">
            <h3>Location</h3>
            <Blocks blocks={page.location.content} />
          </div>
        {/if}
      </div>
    {/if}

    <!-- PRESS & NEWS SPECIFIC -->
    {#if page._type === "press" || page._type === "news"}
      <!-- SOURCE -->
      {#if page.source}
        <div class="published-by">Published by {page.source}</div>
      {/if}
      <!-- DATE -->
      <div class="date">{longFormatDate(page._createdAt)}</div>
      <!-- AUTHOR -->
      {#if page.author}
        <div class="author">Author</div>
      {/if}
      <!-- PEOPLE -->
      {#if page.people && page.people.length > 0}
        <div class="including">
          Including:
          {#each page.people as person}
            <PersonLink {person} />
          {/each}
        </div>
      {/if}
      <!-- PDF DOWNLOAD -->
      {#if page.pdfFile}
        <a href="" class="button download-pdf">Download as PDF</a>
      {/if}
      <!-- ORIGINAL LINK -->
      {#if page.externalLink}
        <a href={page.externalLink} class="button read-original" target="_blank"
          >Read original article on {page.source} <ExternalLink /></a
        >
      {/if}
    {/if}

    <!-- MAIN TEXT -->
    {#if has(page, "content.content")}
      <Blocks blocks={page.content.content} />
    {/if}

    <!-- PEOPLE -->
    {#if showPeople && page.people && Array.isArray(page.people)}
      <div class="people" id="people">
        <h2>People</h2>
        <div class="people-inner">
          {#each page.people as person}
            <a
              class="people-link"
              href={"/people/" + person.slug.current}
              sveltekit:prefetch
            >
              <div class="image">
                {#if person.mainImage}
                  <img
                    alt={person.title}
                    src={urlFor(person.mainImage).quality(90).width(400).url()}
                  />
                {/if}
              </div>
              <div class="text">
                <span class="title">{person.title}</span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- SEE ALSO -->
    {#if page.internalLinks || page.externalLinks}
      <SeeAlso
        externalLinks={page.externalLinks}
        internalLinks={page.internalLinks}
      />
    {/if}
  </div>

  <!-- BOTTOM BAR -->
  <BottomBar updatedAt={page._updatedAt} />
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .main-content {
    float: left;
    width: $two-third;
    margin-bottom: 120px;

    @include screen-size("small") {
      width: 100%;
    }
  }

  .article {
    border: 1px solid $e-ink-dark;
    min-height: 100vh;
    display: inline-block;
    width: 100%;

    @include screen-size("small") {
      border: unset;
    }

    .header {
      display: flex;
      justify-content: space-between;
      width: 100%;

      @include screen-size("small") {
        display: block;
      }

      h1 {
        @include text-margins();
        margin-bottom: 160px;
        line-height: 1.1em;
        @include screen-size("small") {
          margin-left: 0;
        }
      }

      .date {
        @include text-margins();
        margin-bottom: $small-margin;
      }

      .authors {
        @include text-margins();
        margin-bottom: $small-margin;
      }

      .image-container {
        width: 40%;
        max-height: 100%;
        margin-right: $small-margin;
        img {
          border: 1px solid $e-ink-dark;
          max-height: 100%;
          max-width: 100%;
        }

        @include screen-size("small") {
          width: 100%;
        }
      }

      &.boxed {
        display: block;
        height: $HEADER_HEIGHT;
        border-bottom: 1px solid $e-ink-dark;

        @include screen-size("small") {
          height: auto;
          padding-bottom: $large-margin;
        }

        h1 {
          margin-bottom: $small-margin;
        }
      }

      &.tight {
        h1 {
          margin-bottom: 60px;
        }
      }
    }
  }

  .people {
    width: 100%;
    padding: $small-margin;

    @include screen-size("small") {
      padding-left: 0;
      padding-right: 0;
    }

    h2 {
      margin-bottom: $small-margin;
      padding-left: 0;
      padding-right: 0;
      margin-left: 0;
    }

    .people-inner {
      display: inline-block;
      width: 100%;

      .people-link {
        margin-bottom: 20px;
        display: block;
        text-decoration: none;
        width: calc(50% - 8px);
        overflow: hidden;
        float: left;

        @include screen-size("small") {
          width: 100%;
        }

        &:nth-child(odd) {
          margin-right: 15px;
        }

        .title {
          font-size: $font-size-body;
          background: $e-ink-medium;
          margin-top: 10px;
          display: inline-block;
          color: $e-ink-dark;
        }

        .image {
          border: 1px solid $e-ink-dark;
          width: 100%;
          line-height: 0;

          img {
            width: 100%;
            min-height: 200px;
          }
        }
      }
    }
  }

  ul {
    padding: 0;
    li {
      list-style: none;
    }
  }

  .published-by,
  .date,
  .author,
  .including {
    font-style: italic;
    @include text-margins();
    font-size: $font-size-body;
  }

  .including {
    margin-top: $small-margin;
    margin-bottom: $small-margin;
  }

  .button {
    padding: $small-margin;
    background: $e-ink-medium;
    display: inline-block;
    font-size: $font-size-small;
    margin-left: $small-margin;
    text-decoration: none;

    &:hover {
      background: $e-ink-dark;
      color: $e-ink-light;
    }
  }

  .event-info {
    padding: $small-margin;
    border: 1px solid $e-ink-dark;
    font-size: $font-size-small;
    display: inline-block;
    margin-left: $small-margin;
    min-width: 300px;
    width: 40%;

    .dates {
      margin-bottom: $small-margin;
    }
  }

  :global(.event-info p) {
    margin: 0;
  }

  :global(.event-info h3) {
    margin: 0;
  }
</style>
