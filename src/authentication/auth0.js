
import createAuth0Client from "@auth0/auth0-spa-js"
import { writable, get } from 'svelte/store';

// // AUTH0
let auth0Client = null
const DOMAIN = "eyebeam.us.auth0.com"
const CLIENT_ID = "pcL6xHzv2ni7VZ8kPAfcOr8tc4QffcRN"
const DISCORD_PREFIX = "oauth2|discord|"

export const auth0 = {
    isAuthenticated = writable(false),
    configureAuthClient = async () => {
        auth0Client = await createAuth0Client({
            domain: DOMAIN,
            client_id: CLIENT_ID,
            audience: "https://api/sanity",
        })
        // console.log('auth0', auth0)
        isAuthenticated.set(await auth0.isAuthenticated())
        // console.log('get(isAuthenticated)', get(isAuthenticated))
    },
    login = async () => {
        await auth0Client.loginWithRedirect({
            redirect_uri: window.location.origin,
        })
    },
    logout = () => {
        auth0Client.logout({
            returnTo: window.location.origin,
        })
    }
}



