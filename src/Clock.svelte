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
  <span class="time">{time}</span>New York City
</div>

<style lang="scss">
  @import "./variables.scss";

  .clock-berlin {
    font-family: $SERIF_STACK;
    font-size: $FONT_SIZE_SMALL;
    color: $COLOR_LIGHT;

    .time {
      margin-right: 0.5em;
    }

    a {
      color: $COLOR_LIGHT;
      text-decoration: none;
    }
  }
</style>
