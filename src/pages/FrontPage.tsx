import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as QueryString from "query-string"
import { getAuth, writeAuth, getProfile } from "../Auth";


const FrontPage: React.FC = (props: any) => {
    const [auth, setAuth] = useState(getAuth())
    const [displayName, setDisplayName] = useState("");

    const params = QueryString.parse(props.location.search);
    const access_token = params.access_token;
    console.log(`Access Token: ${access_token}`)

    useEffect(() => {
        if (access_token) {
            console.log(`Got access token`)
            writeAuth(access_token);
            setAuth(getAuth());
            getProfile(access_token).then(displayName => setDisplayName(displayName))
        }
        if (auth) {
            getProfile(auth).then(displayName => setDisplayName(displayName))
        }
    }, [])

    return (
        <React.Fragment>
            <h1>Linkify</h1>
            {displayName ? <h1>Welcome, {displayName}</h1> : <h2>Not logged in.</h2>}
            <p>Listen to music together virtually.</p>
            {auth ?
                <Link to="/createRoom" style={{ textDecoration: 'none', backgroundColor: '#1DB954' }}>
                    <Button variant="outlined" color="primary">
                        Create a Room
                </Button>
                </Link>
                :
                <Button href="http://localhost:5000/login" style={{ textDecoration: "none", backgroundColor: "#1DB954" }}>
                    Login to Spotify
                </Button>

            }
        </React.Fragment>
    );
}
export default FrontPage;