import { loadData } from "./sanity.js"
import { writable } from "svelte/store"
import { has, get } from "lodash"

export const globalSettings = writable({})
export let worldObject = writable({})

export const GRID_SIZE = 32

export const buildWorld = () => {
    return new Promise(async (resolve, reject) => {
        const rooms = await loadData('*[_type == "room"]{..., "bgImageUrl": backgroundImage.asset->url}')
        const zones = await loadData('*[_type == "zone"]{..., "bgImageUrl": backgroundImage.asset->url}')
        const objects = await loadData('*[_type == "exob"]')
        const portals = await loadData('*[_type == "portal"]{..., targetArea->{...}, "bgImageUrl": backgroundImage.asset->url}')

        // --> Construct world object by rooms:
        let innerWorld = {}
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

        worldObject.set(innerWorld)
        resolve()
    })
}

export const loadAvatars = () => {
    return new Promise(async (resolve, reject) => {
        const ax = await loadData('*[_type == "avatar"]{..., "imageUrl": image.asset->url}')
        resolve(ax)
    })
}

const parseStyleProperties = r => {
    let widthStyle = "width: " + (get(r, 'dimensions.width', 0) * GRID_SIZE) + "px;"
    let heightStyle = "height: " + (get(r, 'dimensions.height', 0) * GRID_SIZE) + "px;"
    // let backgroundColorStyle =
    //     "background-color:" + get(r, 'backgroundColor.hex', '#ff0000') + ";"
    let backgroundImageStyle = "background-image: url(" + r.bgImageUrl + ");"
    return widthStyle + heightStyle + backgroundImageStyle;
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
