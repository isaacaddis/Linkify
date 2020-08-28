import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { getAuth } from "../Auth";
import MusicPlayer from "../components/MusicPlayer";


const CreateRoom: React.FC = () => {
    const [accessToken, setAccessToken] = useState(getAuth());
    const [spotifyPlayer, setSpotifyPlayer] = useState(undefined);

    return (
        <React.Fragment>
            <h1>Create a Room</h1>
            <div>
                {accessToken ?
                    <MusicPlayer accessToken={accessToken} />
                    :
                    <Button href="http://localhost:5000/login" style={{ textDecoration: "none", backgroundColor: "#1DB954" }}>Login to Spotify</Button>
                }
            </div>
        </React.Fragment>
    );
}

export default CreateRoom;