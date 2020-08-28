import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { getAuth } from "../Auth";
import MusicPlayer from "../components/MusicPlayer";
import CssTextField from "../ui/CSSTextField"
import Grid from '@material-ui/core/Grid';
import { FormStyles } from '../ui/Util';


const CreateRoom: React.FC = () => {
    const classes = FormStyles();

    const [accessToken, setAccessToken] = useState(getAuth());
    const [spotifyPlayer, setSpotifyPlayer] = useState(undefined);

    type formValues = {
        roomName: string,
        hostName: string
    }
    const defaultValues = {
        roomName: "",
        hostName: ""
    }
    const [values, setValues] = useState<formValues>(defaultValues);
    const updateValue = (e: any, mode: number) => {
        const { name, value } = e.target;
        switch (mode) {
            case 1:
                console.log(`Updating roomName to ${value}`) //TODO delete
                setValues({ ...values, roomName: value });
                break;
            case 2:
                console.log(`Updating hostName to ${value}`) //TODO delete
                setValues({ ...values, hostName: value });
                break;
            default:
                console.log(`Invalid mode supplied to updateValue: ${mode}`);
        };
    }

    const submitCreateRoom = async () => {
        console.log(`Submitting create room with values`)
        console.log(values)
        const uri = "http://localhost:5000/createRoom"
        const options = {
            method: "post",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }
        const response = await fetch(uri, options);
        console.log(`Created room with statusCode: ${response.status}`)
    }

    return (
        <React.Fragment>
            <h1>Create a Room</h1>
            <Grid container justify="center" style={{ marginBottom: 10 }}>

                <form>
                    <Grid item>
                        <CssTextField
                            autoFocus
                            style={{ width: 300, color: 'white' }}
                            label="Room Name"
                            placeholder="Room Name"
                            name="roomName"
                            onChange={e => updateValue(e, 1)}
                            InputLabelProps={{
                                className: classes.label,
                            }}
                            InputProps={{
                                className: classes.input,
                            }}
                            value={values.roomName}
                        />
                    </Grid>
                    <Grid item>
                        <CssTextField
                            autoFocus
                            style={{ width: 300, color: 'white' }}
                            label="Hostname"
                            placeholder="Your (host) name"
                            name="hostName"
                            onChange={e => updateValue(e, 2)}
                            InputLabelProps={{
                                className: classes.label,
                            }}
                            InputProps={{
                                className: classes.input,
                            }}
                            value={values.hostName}
                        />
                        <Grid item>
                            <Button onClick={submitCreateRoom} className={classes.button} size="large" color="primary">Get Started</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            {/* <div>
                {accessToken ?
                    <MusicPlayer accessToken={accessToken} />
                    :
                    <Button href="http://localhost:5000/login" style={{ textDecoration: "none", backgroundColor: "#1DB954" }}>Login to Spotify</Button>
                }
            </div> */}
        </React.Fragment>
    );
}

export default CreateRoom;