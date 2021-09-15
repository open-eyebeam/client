<script>
  // # # # # # # # # # # # # #
  //
  //  CLOCK
  //
  // # # # # # # # # # # # # #

  let berlinTime
  let newYorkTime
  let seoulTime

  const updateTime = () => {
    let d = new Date()
    newYorkTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "numeric",
    }).format(d)

    berlinTime = new Intl.DateTimeFormat("nyc-US", {
      timeZone: "Europe/Berlin",
      hour: "numeric",
      minute: "numeric",
    }).format(d)

    seoulTime = new Intl.DateTimeFormat("nyc-US", {
      timeZone: "Asia/Seoul",
      hour: "numeric",
      minute: "numeric",
    }).format(d)
  }

  window.setInterval(updateTime, 10000)
  updateTime()
</script>

<div class="clock-berlin">
  <select>
    <option>{newYorkTime} in New York City</option>
    <option>{berlinTime} in Berlin</option>
    <option>{seoulTime} in Seoul</option>
  </select>
</div>

<!-- <span class="time">{time}</span> -->
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

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    display: block;
    width: 100%;
    margin: 0;
    padding: 10px;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    outline: 0;
    cursor: pointer;
  }
</style>
