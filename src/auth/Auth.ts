// const axios = require('axios').default;

/**
 * @returns [true] if a spotifyAuth key exists in localStorage
 */
export const verifyAuth = () => {
    console.log(`Now verifying auth...`);
    const spotifyAuth = localStorage.getItem("spotifyAuth");
    console.log(spotifyAuth)
    return ((spotifyAuth) ? false : true);
}

/**
 * Sets the key "spotifyAuth" to [token] in localStorage
 * @param token 
 */
export const setAuth = (token: string) => {
    localStorage.setItem('spotifyAuth', token);
}