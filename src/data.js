import { loadData } from "./sanity.js"
import { writable } from "svelte/store"
import { has, get } from "lodash"

export const globalSettings = writable({})
export let worldObject = writable({})

export const buildWorld = () => {
    return new Promise(async (resolve, reject) => {
        const rooms = await loadData('*[_type == "room"]')
        const zones = await loadData('*[_type == "zone"]')
        const objects = await loadData('*[_type == "exob"]')
        const portals = await loadData('*[_type == "portal"]')

        let innerWorld = {}

        // --> Construct world object by rooms:
        rooms.forEach(room => innerWorld[room._id] = room)
        for (const [key, value] of Object.entries(innerWorld)) {
            // Create containers
            innerWorld[key].objects = []
            innerWorld[key].zones = []
            innerWorld[key].portals = []
            // Parse style properties into inline css
            innerWorld[key].inlineStyles = parseStyleProperties(value)
        }

        // Add objects to rooms
        objects.forEach(object => {
            if (has(object, 'parentArea._ref')) {
                innerWorld[object.parentArea._ref].objects.push(object)
            }
        })

        // Add zones to rooms
        zones.forEach(zone => {
            if (has(zone, 'parentArea._ref')) {
                innerWorld[zone.parentArea._ref].zones.push(zone)
            }
        })

        // Add portals to rooms
        portals.forEach(portal => {
            if (has(portal, 'parentArea._ref')) {
                innerWorld[portal.parentArea._ref].portals.push(portal)
            }
        })

        // console.log('innerWorld', innerWorld)

        worldObject.set(innerWorld)
        resolve()
    })
}

const parseStyleProperties = r => {
    // console.log('r', r)
    let widthStyle = "width: " + get(r, 'dimensions.width', '') + "px;"
    let heightStyle = "height: " + get(r, 'dimensions.height', '') + "px;"
    let backgroundColorStyle =
        "background-color:" + get(r, 'backgroundColor.hex', '#ff0000') + ";"
    let backgroundImageStyle = "background-image: url(" + r.bgImageUrl + ");"
    // if (mA.backgroundSound) {
    //     soundFile = mA.backgroundSound
    // }
    return widthStyle + heightStyle + backgroundColorStyle + backgroundImageStyle;
}

// ===> GLOBAL SETTINGS
loadData('*[_id == "global-settings"]')
    .then(gS => {
        // console.log('gS', gS)
        globalSettings.set(gS)
    })
    .catch(err => {
        console.log(err)
    })
