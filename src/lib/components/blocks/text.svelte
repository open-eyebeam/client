<script>
  // # # # # # # # # # # # # #
  //
  //  TEXT RENDERER
  //
  // # # # # # # # # # # # # #

  import slugify from "slugify"

  // __ COMPONENTS
  import PersonLink from "$lib/components/person-link.svelte"

  // __ GRAPHICS
  import ExternalLink from "$lib/components/graphics/external-link.svelte"

  // *** PROPS
  export let b = {}

  const renderNewLines = t => t.replace(/(?:\r\n|\r|\n)/g, "<br>")
</script>

{#if b.children && b.children.length > 0}
  {#if b.style == "h2"}
    <h2
      id={slugify(b.children[0].text, {
        lower: true,
      })}
    >
      {#each b.children as c}
        {#if !c.marks || c.marks.length === 0}
          {c.text}
        {:else}
          <strong>{c.text}</strong>
        {/if}
      {/each}
    </h2>
  {:else if b.style == "h3"}
    <h3>
      {#each b.children as c}
        {c.text}
      {/each}
    </h3>
  {:else}
    <p>
      {#each b.children as c}
        {#if !c.marks || c.marks.length === 0}
          {@html renderNewLines(c.text)}
        {:else if c.marks.includes("em")}
          <em>{@html renderNewLines(c.text)}</em>
        {:else if c.marks.includes("strong")}
          <strong>{@html renderNewLines(c.text)}</strong>
        {:else}
          {#if b.markDefs.find(m => m._key === c.marks[0])._type === "link"}
            <a href={b.markDefs.find(m => m._key === c.marks[0]).href}
              >{@html renderNewLines(c.text)} <ExternalLink /></a
            >
          {/if}
          {#if b.markDefs.find(m => m._key === c.marks[0])._type === "person"}
            <PersonLink
              overrideText={c.text}
              personId={b.markDefs.find(m => m._key === c.marks[0]).link._ref}
            />
          {/if}
        {/if}
      {/each}
    </p>
  {/if}
{/if}
