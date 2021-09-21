import { format, getYear } from "date-fns"

export const SANITY_PROJECT_ID = "58ueii0w"
export const GAME_SERVER_URL = "wss://open.eyebeam.dev";
// export const GAME_SERVER_URL = "ws://localhost:2567"

export const AREA = { YELLOW: 2, RED: 3, GREEN: 4, BLUE: 5, MAGENTA: 6, CYAN: 7, PURPLE: 8, TEAL: 9 }
export const REVERSE_HEX_MAP = { '#FFFF00': 'yellow','#FF0000':'red','#00FF00': 'green', '#0000FF': 'blue', '#FF00FF': 'magenta', '#00FFFF': 'cyan', '#880088': 'purple',  '#008888': 'teal' }
export const HEX_MAP = { YELLOW: '#FFFF00', RED: '#FF0000', GREEN: '#00FF00', BLUE: '#0000FF', MAGENTA: '#FF00FF', CYAN: '#00FFFF', PURPLE: '#880088', TEAL: '#008888' }
export const FORMATMAP = {
  pdfBlock: "PDF",
  videoBlock: "VIDEO",
  audioBlock: "AUDIO",
  imageBlock: "IMAGE",
}

export const MAP = { WIDTH: 1000, HEIGHT: 1000 }

export const QUERY = {
  GRAPHICS_SETTINGS:
    "*[_id == 'graphics-settings']{..., mapLink->{'mainImage': mainImage,'miniImage': miniImage,'pathfindingGridUrl': pathfindingGrid.asset->url}, activeAvatars[]->{title, _id, notRandom, 'spriteJsonURL': spriteJson.asset->url}}[0]",
  ACTIVE_STREAMS:
    "*[_id == 'active-streams']{..., mainStreamEvent->{..., moderators[]->{slug,name,username}, participants[]->{slug,name,username}, connectedCaseStudies[]->{...,participants[]->{slug,name,username}}}}[0]",
  GLOBAL_SETTINGS: "*[_id == 'global-settings']{..., welcomeCard->{...}}[0]",
  ROOMS:
  "*[_type == 'room']{...}",
  OBJECTS:
  "*[_type == 'exob']{...}",
}

// const mainFormat = "MMM dd yyyy – HH:mm"
// const mainFormat = "MMM dd – HH:mm"
// const mainFormat = "HH:mm 'CET,' EEE MMM dd"
// const mainFormat = 'HH:mm (z) E MMM dd'
const mainFormat = 'HH:mm z, dd MMM DD'

const intlFormat = new Intl.DateTimeFormat('en-DE', {
  hour: 'numeric',
  minute: 'numeric',
  weekday: 'short',
  month: 'short',
  day: '2-digit',
  timeZone: 'CET',
})

export const formattedDate = (start, end) => {
  try {
    if (!start) {
      return false
    }
    const startDate = Date.parse(start)
    const dateParts = intlFormat.formatToParts(startDate);
    const startDateFormatted = dateParts[6].value + dateParts[7].value + dateParts[8].value + ' CET, ' + dateParts[0].value + ' ' + dateParts[4].value + ' ' + dateParts[2].value;
    // const startDateCETFormatted = startDateCET + 'CET';

    if (!startDate) {
      return false
    }

    if (!end) {
      // return formatToTimeZone(startDate, mainFormat, { timeZone: 'Europe/Berlin' })
      // return format(startDate, mainFormat)
      // console.log(dateParts);
      return startDateFormatted;
    }

    const endDate = Date.parse(end)
    // const startDate = Date.parse(start)
    const endDateParts = intlFormat.formatToParts(endDate);
    const endDateFormatted = endDateParts[6].value + endDateParts[7].value + endDateParts[8].value + ' CET, ' + endDateParts[0].value + ' ' + endDateParts[4].value + ' ' + endDateParts[2].value;


    if (startDateFormatted == endDateFormatted) {
      return startDateFormatted
    }

    const startFormat =
      getYear(startDate) == getYear(endDate) ? "dd.MM" : "dd.MM.yyyy"
    const endFormat = "dd.MM.yyyy"

    return startDateFormatted + " – " + endDateFormatted
  } catch (err) {
    console.dir(err)
  }
}

export const formattedChatDate = start => {
  try {
    const startDate = start ? start : Date.now()
    return format(startDate, "HH:mm EEE")
  } catch (err) {
    console.dir(err)
  }
}

export const nanoid = (t = 21) => {
  let e = "",
    r = crypto.getRandomValues(new Uint8Array(t))
  for (; t--; ) {
    let n = 63 & r[t]
    e +=
      n < 36
        ? n.toString(36)
        : n < 62
        ? (n - 26).toString(36).toUpperCase()
        : n < 63
        ? "_"
        : "-"
  }
  return e
}

export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
  Math.ceil(min)

export function debounce(fn, wait = 1) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.call(this, ...args), wait)
  }
}

/**
 * Provides the overlapping status between two elements
 * based on the passed in Element objects
 *
 * @param {Element, Element} Element object of DOM
 * @return {Boolean} overlap status or null if native object not received
 */
  export const isOverlapping = (e1, e2) => {
  if (e1.length && e1.length > 1) {
    e1 = e1[0]
  }
  if (e2.length && e2.length > 1) {
    e2 = e2[0]
  }
  const rect1 = e1 instanceof Element ? e1.getBoundingClientRect() : false
  const rect2 = e2 instanceof Element ? e2.getBoundingClientRect() : false

  // console.log(rect1, rect2)

  let overlap = false

  if (rect1 && rect2) {
    overlap = !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    )
    return overlap
  }

  console.warn("Please provide valid HTMLElement object")
  return overlap
}
