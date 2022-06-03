// * * * * * * * * * * * * * * * * * * * * * * * * * * * 
//
//  authentication.js =>
//  Handles the authentication process and processing 
//  of user information
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * *

import Keycloak from "keycloak-js"
import { writable } from 'svelte/store';
import Cookies from "js-cookie"
import { errorLogger } from "$lib/modules/utilities.js";

export const isAuthenticated = writable(false);
export const profile = writable(false);

let keycloak = {}

export const configureAuthClient = async () => {
    return new Promise((resolve, reject) => {
        keycloak = new Keycloak({
            url: 'https://hello.undersco.re/auth/',
            realm: 'undersco_re',
            clientId: 'underscore_openeyebeam'
        });
        keycloak.init({
            // onLoad: 'login-required',
            // onLoad: 'check-sso',
            // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
        }).then(authenticated => {
            isAuthenticated.set(authenticated)
            if (authenticated) {
                console.log('Authenticated')
                Cookies.set("open-eyebeam-logged-in", true)
                keycloak.loadUserProfile()
                    .then(async (p) => {
                        console.log('p', p)
                        const fullProfile = await updateUser(p);
                        profile.set(fullProfile);
                    }).catch(() => {
                        errorLogger('Failed to load user profile');
                    }).finally(() => {
                        resolve()
                    })
            } else {
                resolve()
            }
        }).catch(e => {
            console.log('error in auth ->', e)
            reject(e)
        });
    })
}

export const login = async () => {
    keycloak.login({ redirectUri: window.location.origin })
}

export const logout = () => {
    Cookies.remove("open-eyebeam-logged-in")
    keycloak.logout({ redirectUri: window.location.origin })
}

// Update the user information stored in the sanity database
// and return the new user object
const updateUser = profile => {
    return new Promise(async (resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(profile),
            redirect: 'follow'
        }
        const response = await fetch("/api/update-user", requestOptions)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const userProfile = await response.json();
        resolve(userProfile);
    })
}

