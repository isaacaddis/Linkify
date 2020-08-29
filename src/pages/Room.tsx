import React from "react";
import * as QueryString from "query-string"
import MusicPlayer from "../components/MusicPlayer";
import { Button } from "@material-ui/core";
import { getAuth } from "../Auth";


const Room: React.SFC<{ location: any }> = (props) => {
    const params = QueryString.parse(props.location.search);
    const roomName = params.roomName;
    const hostName = params.hostName;
    const accessToken = getAuth();
    return (
        <React.Fragment>
            <h1>Now in room: <strong>{roomName}</strong></h1>
            <h2>Host: {hostName}</h2>
            <p>Your access token is: {accessToken}</p>
            <div>
                {accessToken ?
                    <MusicPlayer accessToken={accessToken} />
                    :
                    <Button href="http://localhost:5000/login" style={{ textDecoration: "none", backgroundColor: "#1DB954" }}>Login to Spotify</Button>
                }
            </div>
        </React.Fragment>
    )
}

export default Room;