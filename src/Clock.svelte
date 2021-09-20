<script>
  // # # # # # # # # # # # # #
  //
  //  CLOCK
  //
  // # # # # # # # # # # # # #
  const API_KEY = "a9b67d6b5ed093b28c410750ef6a70cd"

  let berlinTime
  let newYorkTime
  let seoulTime
  let currentWeather = {
    nyc: {
      description: "",
      temperature: "",
    },
    berlin: {
      description: "",
      temperature: "",
    },
    seoul: {
      description: "",
      temperature: "",
    },
  }

  let selectValue = "New York"

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

  $: if (selectValue) {
    console.log("selectValue", selectValue)
  }

  const updateWeather = () => {
    // NEW YORK
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=new york&appid=" +
        API_KEY
    )
      .then(response => response.json())
      .then(data => {
        console.log(data)
        currentWeather["nyc"].description = data.weather[0].description
        currentWeather["nyc"].temperature = Math.round(
          ((data.main.temp - 273.15) * 9) / 5 + 32
        )
      })
    // BERLIN
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=" +
        API_KEY
    )
      .then(response => response.json())
      .then(data => {
        console.log(data)
        currentWeather["berlin"].description = data.weather[0].description
        currentWeather["berlin"].temperature = Math.round(
          data.main.temp - 273.15
        )
      })

    // SEOUL
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=" + API_KEY
    )
      .then(response => response.json())
      .then(data => {
        console.log(data)
        currentWeather["seoul"].description = data.weather[0].description
        currentWeather["seoul"].temperature = Math.round(
          data.main.temp - 273.15
        )
      })
  }

  updateWeather()
</script>

<div class="clock">
  <select bind:value={selectValue}>
    <option value="New York"
      >{newYorkTime} in New York City / {currentWeather["nyc"].temperature}°F {currentWeather[
        "nyc"
      ].description}</option
    >
    <option value="Berlin"
      >{berlinTime} in Berlin / {currentWeather["berlin"].temperature}°C {currentWeather[
        "berlin"
      ].description}</option
    >
    <option value="Seoul"
      >{seoulTime} in Seoul / {currentWeather["seoul"].temperature}°C {currentWeather[
        "seoul"
      ].description}</option
    >
  </select>
</div>

<style lang="scss">
  @import "./variables.scss";

  .clock {
    font-family: $SERIF_STACK;
    font-size: $FONT_SIZE_SMALL;
    color: $COLOR_LIGHT;
    display: flex;

    .weather {
      margin-right: 0.5em;
    }

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
