<script>
  import Blocks from "$lib/components/blocks/blocks.svelte"
  export let feedItem = {}
</script>

  <div class="feed-item">
    <div class="time">{feedItem.title}</div>
    <Blocks blocks={feedItem.content.content} /> 
  </div>
  <style lang="scss">
  @import "src/lib/style/variables.scss";
  .time {
    color: $e-ink-almost-dark; 
    font-size: $font-size-extra-small;
    margin-bottom: 12px;
}
</style>
