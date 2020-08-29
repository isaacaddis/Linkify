import React, { useState, useEffect } from "react";
import * as QueryString from "query-string"
import MusicPlayer from "../components/MusicPlayer";
import { Button } from "@material-ui/core";
import { getAuth } from "../Auth";


const Room: React.SFC<{ location: any }> = (props) => {
    const [queue, setQueue] = useState("");
    const params = QueryString.parse(props.location.search);
    const roomId = params.roomId;
    const roomName = params.roomName;
    const hostName = params.hostName;
    const accessToken = getAuth();

    const getQueue = async () => {
        alert("Getting queue...")
        // get queue
        const queueEndpoint = `http://localhost:5000/getQueue?id=${roomId}`
        const response = await fetch(queueEndpoint, { method: "GET" });
        const json = await response.json();
        setQueue(json.queue);
    }
    /**
     * 
     * Fetch queue of room
     * set it to the React hook
     * 
     */
    useEffect(() => {
        getQueue();
    }, []);
    return (
        <React.Fragment>
            <h1>Now in room: <strong>{roomName}</strong></h1>
            <h2>Host: {hostName}</h2>
            <h2>Current Song Queue: </h2>
            {queue}
            <div>
                {accessToken ?
                    //@ts-ignore
                    <MusicPlayer accessToken={accessToken} queue={queue} />
                    :
                    <Button href="http://localhost:5000/login" style={{ textDecoration: "none", backgroundColor: "#1DB954" }}>Login to Spotify</Button>
                }
            </div>
        </React.Fragment>
    )
}

export default Room;