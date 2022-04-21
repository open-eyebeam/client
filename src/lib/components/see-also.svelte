<script>
  // # # # # # # # # # # # # #
  //
  //  SEE ALSO
  //
  // # # # # # # # # # # # # #

  // __ IMPORTS
  import { postTypeToName, postTypeToCategory } from "$lib/modules/global.js"
  import { get } from "lodash"

  // __ GRAPHICS
  import ExternalLink from "$lib/components/graphics/external-link.svelte"

  // *** PROPS
  export let externalLinks = []
  export let internalLinks = []

  console.log("externallinks", externalLinks)
  console.log("internlalinks", internalLinks)
</script>

<div class="see-also">
  <div class="header">See also:</div>
  <ul>
    <!-- INTERNAL LINKS -->
    {#if internalLinks}
      {#each internalLinks as link}
        <li>
          <a
            href={"/" +
              postTypeToCategory[link._type] +
              "/" +
              get(link, "slug.current", "")}
            sveltekit:prefetch>{link.title}</a
          >
        </li>
      {/each}
    {/if}
    <!-- EXTERNAL LINKS -->
    {#if externalLinks}
      {#each externalLinks as link}
        <li>
          <a href={link.linkUrl} target="_blank"
            >{link.linkText} <ExternalLink /></a
          >
        </li>
      {/each}
    {/if}
  </ul>
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .see-also {
    width: 100%;
    background: $e-ink-medium;
    padding: $small-margin;
    font-size: $font-size-body;
    border-top: 1px solid $e-ink-dark;
  }

  ul {
    li {
      a {
        text-decoration: none;
      }
    }
  }
</style>
