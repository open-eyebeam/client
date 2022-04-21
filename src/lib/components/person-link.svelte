<script>
  // # # # # # # # # # # # # #
  //
  //  Person link
  //
  // # # # # # # # # # # # # #

  //  __ IMPORTS
  import { loadDataFromMainSite } from "$lib/modules//sanity.js"
  import get from "lodash/get.js"

  // __ PROPS
  export let person = false
  export let overrideText = false
  export let personId = false

  const renderNewLines = t => t.replace(/(?:\r\n|\r|\n)/g, "<br>")

  if (personId) {
    loadDataFromMainSite('*[_id == "' + personId + '"][0]').then(p => {
      person = p
    })
  }
</script>

{#if person}
  <a href={"/people/" + get(person, "slug.current")}>
    {@html overrideText ? renderNewLines(overrideText) : person.title}
  </a>
{/if}

<style lang="scss">
  @import "src/lib/style/variables.scss";

  a {
    color: $e-ink-dark;
    background: $e-ink-medium;
    text-decoration: none;
    margin-bottom: 3px;
    display: inline-block;
  }
</style>
