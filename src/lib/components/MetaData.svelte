<script>
  // # # # # # # # # # # # # #
  //
  //  METADATA
  //
  // # # # # # # # # # # # # #
  import has from "lodash/has.js"
  import isArray from "lodash/isArray.js"
  import isEmpty from "lodash/isEmpty.js"
  import truncate from "lodash/truncate.js"
  import { toPlainText, urlFor } from "$lib/modules/sanity.js"
  import { globalSettings } from "$lib/modules/utilities.js"

  // *** PROPS
  export let post = {}

  let url = window.location

  const stripHtml = html => {
    let tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  let title = "Open Eyebeam"
  let description = "Open Eyebeam is an experimental digital studio space for Eyebeam's artists and the broader Eyebeam community."
  let image = "/images/open_eyebeam.png"

  $: {
    if (has(post, "name") && !isEmpty(post.name)) {
      title = stripHtml(post.name) + " | " + $globalSettings.title
    } else if (has(post, "title") && !isEmpty(post.title)) {
      title = stripHtml(post.title) + " | " + $globalSettings.title
    } else if ($globalSettings.title) {
      title = $globalSettings.title
    } else {
      title = "Open Eyebeam"
    }
  }

  $: {
    if (has(post, "description") && post.description.length > 0) {
      description = truncate(post.description, {
        length: 260,
        separator: /.? +/,
      })
    } else if (
      has(post, "biography.content") &&
      isArray(post.biography.content) &&
      !isEmpty(post.biography.content)
    ) {
      description = truncate(toPlainText(post.biography.content), {
        length: 260,
        separator: /.? +/,
      })
    } else if (
      has(post, "content.content") &&
      isArray(post.content.content) &&
      !isEmpty(post.content.content)
    ) {
      description = truncate(toPlainText(post.content.content), {
        length: 260,
        separator: /.? +/,
      })
    } else {
      description = $globalSettings.siteDescription
    }
  }

  $: {
    image =
      has(post, "mainImage") && post.mainImage
        ? urlFor(post.mainImage).quality(80).height(800).width(1200).url()
        : urlFor($globalSettings.metaImage)
            .quality(80)
            .height(800)
            .width(1200)
            .url()
    console.log('image: ', image)
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />
  <meta property="image" content={image} />
  <meta property="og:image" content={image} />
  <meta property="twitter:image" content={image} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={url} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="postrational.foundation" />
</svelte:head>
