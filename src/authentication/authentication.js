
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

export const configureAuthClient = async () => {
    return new Promise((resolve, reject) => {
        keycloak.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
        }).then(authenticated => {
            console.log(authenticated ? 'authenticated' : 'not authenticated');
            console.log('keycloak', keycloak);
            isAuthenticated.set(authenticated)
            if (authenticated) {
                keycloak.loadUserProfile()
                    .then(p => {
                        console.log('profile', p);
                        profile.set(p);
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
    // keycloak.login({ redirectUri: 'https://open-eyebeam.netlify.app/' })
}

export const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin })
}