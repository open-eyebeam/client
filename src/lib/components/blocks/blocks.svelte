<script>
  // # # # # # # # # # # # # #
  //
  //  BLOCK RENDERER
  //
  // # # # # # # # # # # # # #

  // __ BLOCKS
  import Text from "./text.svelte"
  import Image from "./image.svelte"
  import ImageFromMainSite from "./imageFromMainSite.svelte"
  import InvertedBlock from "./invertedBlock.svelte"
  import LogoBlock from "./logoBlock.svelte"
  import Embed from "./embed.svelte"
  import HTML from "./html.svelte"
  import Divider from "./divider.svelte"
  import Columns from "./columns.svelte"
  import DonationWidget from "./donationWidget.svelte"
  import ApplicationButton from "./applicationButton.svelte"
  import Faq from "./faq.svelte"
  import Video from "./video.svelte"

  // *** PROPS
  export let blocks = []
  export let mainSite = false
</script>

{#each blocks as b}
  {#if b._type == "block"}
    {#if b.style == "logoBlock"}
      <LogoBlock {b} />
    {:else if b.style == "invertedBlock"}
      <InvertedBlock {b} />
		{:else if b.style == 'html'}
			<HTML {b} />
    {:else}
      <Text {b} />
    {/if}
  {/if}
  {#if b._type == "image"}
    {#if mainSite}
      <ImageFromMainSite {b} />
    {:else}
      <Image {b} />
    {/if}
  {/if}
  {#if b._type == "embedBlock"}
    <Embed {b} />
  {/if}
  {#if b._type == "dividerBlock"}
    <Divider {b} />
  {/if}
  {#if b._type == "columnsBlock"}
    <Columns {b} />
  {/if}
  {#if b._type == "donationWidget"}
    <DonationWidget {b} />
  {/if}
  {#if b._type == "applicationButton"}
    <ApplicationButton {b} />
  {/if}
  {#if b._type == "faq"}
    <Faq {b} />
  {/if}
  {#if b._type == "videoBlock"}
    <Video {b} />
  {/if}
{/each}
