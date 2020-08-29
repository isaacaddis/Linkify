import React, { useState, useEffect } from "react";
import * as QueryString from "query-string"
import MusicPlayer from "../components/MusicPlayer";
import { Button, Grid } from "@material-ui/core";
import { getAuth } from "../Auth";
import CssTextField from "../ui/CSSTextField"
import { FormStyles } from "../ui/Util";
import ErrorSnackbar from "../dialogs/ErrorDialog";
import SuccessSnackbar from "../dialogs/SuccessSnackbar";
import QueueContainer from "../components/QueueContainer";


const Room: React.SFC<{ location: any }> = (props) => {
    const classes = FormStyles();

    const [queue, setQueue] = useState([]);
    const params = QueryString.parse(props.location.search);

    const roomId = params.roomId;

    const [roomName, setRoomName] = useState("");
    const [hostName, setHostName] = useState("");
    const accessToken = getAuth();

    const [uri, setUri] = useState("");

    const [isSuccess, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("Success 🎉");

    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("There was an error with your input.")

    const addUri = async () => {
        if (uri.length < 2) {
            setError(true);
            setErrorMessage("This URI doesn't look correct.")
        }
        else {
            const endpoint = "http://localhost:5000/addToQueue"
            const payload = {
                roomId: roomId,
                uri: uri
            }
            const options = {
                method: "post",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
            const response = await fetch(endpoint, options);
            setSuccess(true);
            setSuccessMessage("Added to queue 🎉")
        }
    }

    const getQueue = async () => {
        // get queue
        const queueEndpoint = `http://localhost:5000/getRoom?id=${roomId}`
        const response = await fetch(queueEndpoint, { method: "GET" });
        const json = await response.json();
        const room = json.room;
        setQueue(room.queue);
        setRoomName(room.roomName);
        setHostName(room.hostName);
    }

    const serviceWorker = () => {
        const task = async () => {
            console.log(`Now looking for queue updates...`)
            const queueEndpoint = `http://localhost:5000/getRoom?id=${roomId}`
            const response = await fetch(queueEndpoint, { method: "GET" });
            const json = await response.json();
            const _queue = json.room.queue;
            if (queue.sort() != _queue.sort) {
                setQueue(_queue);
            }
        }
        setInterval(task, 1000);
    }

    useEffect(() => {
        getQueue();
        serviceWorker();
    }, []);
    return (
        <React.Fragment>
            <h1>Now in room: <strong>{roomName}</strong></h1>
            <h2>Host: {hostName}</h2>
            <Grid container justify="center" spacing={3}>
                <Grid item>
                    <CssTextField
                        autoFocus
                        style={{ width: 300, color: 'white' }}
                        label="Add song (by Artist URI)"
                        placeholder="Artist URI"
                        name="artistURI"
                        onChange={e => setUri(e.target.value)}
                        InputLabelProps={{
                            className: classes.label,
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button onClick={addUri} className={classes.button} size="large" >Add to Queue</Button>
                </Grid>
            </Grid>
            <h2>Current Song Queue: </h2>
            <QueueContainer roomId={roomId} queue={queue} />

            <Grid container justify="center">
                {accessToken ?
                    //@ts-ignore
                    <MusicPlayer accessToken={accessToken} queue={queue} />
                    :
                    <Button href="http://localhost:5000/login" style={{ textDecoration: "none", backgroundColor: "#1DB954" }}>Login to Spotify</Button>
                }
            </Grid>
            <br />
            <SuccessSnackbar
                open={isSuccess}
                onClose={() => setSuccess(false)}
                message={successMessage}
            />
            <ErrorSnackbar
                open={isError}
                onClose={() => setError(false)}
                message={errorMessage}
            />
        </React.Fragment>
    )
}

export default Room;