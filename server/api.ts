import { client_id, client_secret} from "./ServerConstants";
const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
});
