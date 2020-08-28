/**
 * @returns [true] if a spotifyAuth key exists in localStorage
 */
export const verifyAuth = () => {
    console.log(`Now verifying auth...`);
    const spotifyAuth = localStorage.getItem("spotifyAuth");
    console.log(spotifyAuth)
    return ((spotifyAuth) ? false : true);
}

export const getAuth = () => localStorage.getItem('spotifyAuth')

/**
 * Sets the key "spotifyAuth" to [token] in localStorage
 * @param token 
 */
export const writeAuth = (token: any) => {
    localStorage.setItem('spotifyAuth', token);
}

export const getProfile = async (access_token: any) => {
    console.log(`Now getting profile...`)
    const url = "https://api.spotify.com/v1/me";
    const options = {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    const getProfileRes = await fetch(url, options);
    const getProfileResJSON = await getProfileRes.json();
    const displayName = getProfileResJSON.display_name;
    console.log(`Got display name: ${displayName}`)
    return displayName;
}