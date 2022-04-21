
import Keycloak from "keycloak-js"
import { writable, get } from 'svelte/store';

// *** STORES
export const isAuthenticated = writable(false);
export const profile = writable(false);

// KEYCLOAK
const keycloak = new Keycloak({
    url: 'https://hello.undersco.re/auth/',
    realm: 'undersco_re',
    clientId: 'underscore_openeyebeam'
});

// Update the user information stored in the sanity database and return the new user object
const updateUser = profile => {
    return new Promise(async (resolve, reject) => {
        console.log('updateUser', profile);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(profile),
            redirect: 'follow'
        }
        const response = await fetch("https://open-eyebeam.netlify.app/.netlify/functions/update-user", requestOptions)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const userProfile = await response.json();
        console.log('userProfile', userProfile);
        resolve(userProfile);
    })
}

export const configureAuthClient = async () => {
    return new Promise((resolve, reject) => {
        keycloak.init({
            // onLoad: 'login-required',
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
        }).then(authenticated => {
            console.log(authenticated ? 'authenticated' : 'not authenticated');
            console.log('keycloak', keycloak);
            isAuthenticated.set(authenticated)
            if (authenticated) {
                keycloak.loadUserProfile()
                    .then(async (p) => {
                        console.log('profile', p);
                        const fullProfile = await updateUser(p);
                        console.log('fullProfile', fullProfile);
                        profile.set(fullProfile);
                    }).catch(() => {
                        console.log('Failed to load user profile');
                    }).finally(() => {
                        resolve()
                    })
            } else {
                resolve()
            }
        }).catch(e => {
            console.log(e)
            console.log('failed to initialize');
            reject(e)
        });
    })
}

export const login = async () => {
    console.log(window.location.origin)
    keycloak.login({ redirectUri: window.location.origin })
}

export const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin })
}