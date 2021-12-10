import { loadData } from "./sanity.js"
import { writable } from "svelte/store"

export const globalSettings = writable({})
export const mainAreaStyles = writable("")
export let rooms = []
export let zones = []
export let objects = []

// ===> MAIN AREA
loadData('*[_id == "main-area"]{..., "bgImageUrl": backgroundImage.asset->url}[0]')
    .then(mA => {
        // console.log(mA)
        let widthStyle = "width: " + mA.dimensions.width + "px;"
        let heightStyle = "height: " + mA.dimensions.height + "px;"
        let backgroundColorStyle =
            "background-color:" + mA.backgroundColor.hex + ";"
        let backgroundImageStyle = "background-image: url(" + mA.bgImageUrl + ");"
        // if (mA.backgroundSound) {
        //     soundFile = mA.backgroundSound
        // }
        mainAreaStyles.set(widthStyle + heightStyle + backgroundColorStyle + backgroundImageStyle)
    }).catch(err => {
        console.log(err)
    })

// ===> ROOMS
loadData('*[_type == "room"]')
    .then(rs => {
        // console.log("rs", rs)
        rooms = rs
    }).catch(err => {
        console.log(err)
    })

// ===> ZONES
loadData('*[_type == "zone"]')
    .then(zs => {
        // console.log("zs", zs)
        zones = zs
    }).catch(err => {
        console.log(err)
    })

// ===> OBJECTS
loadData('*[_type == "object"]')
    .then(objs => {
        // console.log("objs", objs)
        objects = objs
    }).catch(err => {
        console.log(err)
    })

// ===> GLOBAL SETTINGS
loadData('*[_id == "global-settings"]')
    .then(gS => {
        globalSettings.set(gS)
    })
    .catch(err => {
        console.log(err)
    })
