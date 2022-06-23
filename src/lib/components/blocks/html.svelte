<script>
	// # # # # # # # # # # # # #
	//
	//  RAW HTML
	//
	// # # # # # # # # # # # # #


	// *** PROPS
	export let b = {};
	$: b, console.log('html: ', b)
</script>

{#if b.children && b.children.length > 0}
	<div class="html-content">
		{#each b.children as c}
			{@html c.text}
		{/each}
	</div>
{/if}


<style lang="scss">
  @import "src/lib/style/variables.scss";
	.html-content {
		.text {
		}
	}
</style>
