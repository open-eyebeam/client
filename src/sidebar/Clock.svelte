<script>
  // # # # # # # # # # # # # #
  //
  //  CLOCK
  //
  // # # # # # # # # # # # # #

  function berlinTime() {
    var d = new Date()
    var cet = new Intl.DateTimeFormat("nyc-US", {
      timeZone: "EST",
      hour: "numeric",
      minute: "numeric",
    }).format(d)
    time = cet
    return cet
  }

  var time = berlinTime()
  window.setInterval(berlinTime, 10000)
  berlinTime()
</script>

<div class="clock-berlin">
  {time}&nbsp; New York City
</div>

<style lang="scss">
  @import "../variables.scss";

  .clock-berlin {
    font-family: $MONO_STACK;
    font-size: $FONT_SIZE_SMALL;
    color: $COLOR_LIGHT;
    word-spacing: -0.3em;

    a {
      color: white;
      text-decoration: none;
    }
  }
</style>
