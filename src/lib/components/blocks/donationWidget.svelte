<script>
  // # # # # # # # # # # # # #
  //
  //  DONATION WIDGET
  //
  // # # # # # # # # # # # # #

  // *** PROPS
  export let b = {}

  // let gl = document.createElement('script');
  // gl.src = 'https://secure.givelively.org/widgets/simple_donation/the-eyebeam-atelier-inc/donate-to-eyebeam.js?show_suggested_amount_buttons=false&show_in_honor_of=false&address_required=false&has_required_custom_question=false';
  // document.getElementsByTagName('head')[0].appendChild(gl);
</script>

<svelte:head>
  <script
    src="https://secure.givelively.org/widgets/simple_donation/the-eyebeam-atelier-inc/donate-to-eyebeam.js?show_suggested_amount_buttons=false&show_in_honor_of=false&address_required=false&has_required_custom_question=false"></script>
</svelte:head>

<div class="donation-widget">
  <!-- Begin Give Lively Fundraising Widget -->
  <div id="give-lively-widget" class="gl-simple-donation-widget" />
</div>

<style lang="scss">
  @import "src/lib/style/variables.scss";

  .donation-widget {
    margin-top: $small-margin;
    height: 600px;
    background: red;
    width: 100%;
  }

  :global(.gl-widget__frequency-selection-container) {
    height: 200px;
    background: yellow;
  }

  :global(.gl-widget__input-group) {
    height: 200px;
    background: green;
  }

  :global(.gl-widget__payment) {
    height: 200px;
    background: blue;
  }

  :global(.gl-widget__frequency-buttons) {
    height: 100% !important;
  }
</style>
