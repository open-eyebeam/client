<script>
  // # # # # # # # # # # # # #
  //
  //  AmbientAudio
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { Howl } from "howler"
  import get from "lodash/get"
  import { onDestroy } from "svelte"

  // *** PROPS
  export let soundFile = false

  // *** VARIABLES
  let audioURL = false
  let audioPlayer = {}

  const destroySound = () => {
    if (audioPlayer && audioPlayer.playing) {
      console.log("deströööööy")
      audioPlayer.stop()
      audioPlayer.unload()
      audioPlayer = {}
    }
  }

  $: {
    if (soundFile) {
      audioURL =
        "https://cdn.sanity.io/files/58ueii0w/production/" +
        get(soundFile, "asset._ref", "")
          .replace("file-", "")
          .replace("-mp3", ".mp3")
      destroySound()
      audioPlayer = new Howl({
        src: [audioURL],
        loop: true,
        // autoplay: true,
      })
    }
  }

  $: console.log("??? AUDIOURL", audioURL)

  onDestroy(async () => {
    destroySound()
  })
</script>
