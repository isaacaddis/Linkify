import { generateRandomString } from "../ServerUtils";
import { stateKey, client_id, redirect_uri, client_secret } from "../ServerConstants";

const request = require('request-promise');
const querystring = require('querystring');

export const handleLogin = (req: any, res: any) => {
    console.log(`Got request to login`);
    const state = generateRandomString(16);
    console.log(`Generated random string: ${state}`);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope = 'streaming user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));

}

export const handleCallback = async (req: any, res: any) => {
    console.log(`Now handling callback...`)
    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true,
            resolveWithFullResponse: true
        };
        console.log(`Now POSTing /api/token with options: `);
        console.log(authOptions);
        const response = await request(authOptions);
        const body = response.body;
        try {
            if (response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(`Profile: `)
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        }
        catch (err) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'invalid_token'
                }));

        }

    }
}
export const handleRefreshToken = async (req: any, res: any) => {
    console.log(`Now handling refresh token...`);
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true,
        resolveWithFullResponse: true
    };
    const response = await request(authOptions);
    const body = response.body;
    try {
        if (response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    }
    catch (err) {
        console.log(`An error occured in POSTing refresh token: ${err}`)
    }

}