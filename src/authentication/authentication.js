
import createAuth0Client from "@auth0/auth0-spa-js"
import Keycloak from "keycloak-js"
// import Cookies from "js-cookie"
import { writable, get } from 'svelte/store';

// *** STORES
export const isAuthenticated = writable(false)

// KEYCLOAK
const keycloak = new Keycloak({
    url: 'https://hello.undersco.re/auth/',
    realm: 'undersco_re',
    clientId: 'underscore_openeyebeam'
});

export const configureAuthClient = async () => {
    keycloak.init({
        // onLoad: 'login-required',
        // onLoad: 'check-sso',
        // silentCheckSsoRedirectUri: window.location.origin
    }).then(authenticated => {
        console.log(authenticated ? 'authenticated' : 'not authenticated');
        isAuthenticated.set(authenticated)
        // keycloak.updateToken(30).then(function() {
        //     loadData();
        // }).catch(function() {
        //     alert('Failed to refresh token');
        // });
        // keycloak.loadUserProfile()
        //     .then(function (profile) {
        //         alert(JSON.stringify(profile, null, "  "))
        //     }).catch(function () {
        //         alert('Failed to load user profile');
        //     });
    }).catch(e => {
        console.log(e)
        console.log('failed to initialize');
    });
}

export const login = async () => {
    console.log(window.location.origin)
    keycloak.login({ redirectUri: window.location.origin })
    // await auth0.loginWithRedirect({
    //     redirect_uri: window.location.origin,
    // })
}

export const logout = () => {
    // auth0.logout({
    //     returnTo: window.location.origin,
    // })
}




// // AUTH0
// export let auth0 = null
// const DOMAIN = "eyebeam.us.auth0.com"
// const CLIENT_ID = "pcL6xHzv2ni7VZ8kPAfcOr8tc4QffcRN"
// const DISCORD_PREFIX = "oauth2|discord|"

// export const configureAuthClient = async () => {
//     auth0 = await createAuth0Client({
//         domain: DOMAIN,
//         client_id: CLIENT_ID,
//         audience: "https://api/sanity",
//     })
//     console.log('auth0', auth0)
//     isAuthenticated.set(await auth0.isAuthenticated())
//     console.log('get(isAuthenticated)', get(isAuthenticated))
// }

// export const login = async () => {
//     await auth0.loginWithRedirect({
//         redirect_uri: window.location.origin,
//     })
// }

// export const logout = () => {
//     auth0.logout({
//         returnTo: window.location.origin,
//     })
// }

