/**
 * @returns access token cookie
 */
export const getAuth = () => localStorage.getItem('accessToken')

/**
 * Removes accessToken from the localStorage
 */
export const removeToken = () => localStorage.removeItem('accessToken');

/**
 * Sets the key "spotifyAuth" to [token] in localStorage
 * @param token 
 */
export const writeAuth = (token: any) => {
    localStorage.setItem('accessToken', token);
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