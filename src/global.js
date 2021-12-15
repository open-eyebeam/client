import { format, getYear } from "date-fns"

export const SANITY_PROJECT_ID = "58ueii0w"

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

export const toRGBA = color => {
  if (color && color.rgb) {
    return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
  } else {
    return 'rgba(255, 255, 255, 1)'
  }
}

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
  for (; t--;) {
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
