
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
    // keycloak.login({ redirectUri: 'http://localhost:5000' })
    keycloak.login({ redirectUri: window.location.origin })
    // keycloak.login({ redirectUri: 'https://open-eyebeam.netlify.app' })
}

export const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin })
}

