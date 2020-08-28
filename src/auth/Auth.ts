const axios = require('axios').default;

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

// export const getLogin = async () => {
//     console.log(`Now sending login request to server...`)
//     try {
//         const response = await axios.get('/login');
//         console.log(`Response: `)
//         console.log(response)
//     }
//     catch(err){
//         console.log(err)
//     }
//     // const url = '/login';
//     // const options = {
//     //     // mode: 'no-cors',
//     //     method: 'get',
//     //     headers: {
//     //         "Access-Control-Allow-Origin": "*",
//     //         'Accept': 'application/json',
//     //         'Content-Type': 'application/json',
//     //     },
//     // };

//     // const response = await fetch(url, options);
//     // const body = await response.text();
//     // console.log(`Login response: `)
//     // console.log(response)
//     // setAuth(body);
// }