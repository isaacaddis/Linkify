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

    const getFirstNameOnly = (fullname: string) => {
        const split = fullname.split(" ");
        return split[0];
    }

    return (
        <React.Fragment>
            <h1>Linkify</h1>
            {displayName ? <h3>Welcome, {getFirstNameOnly(displayName)}</h3> : <h3>Not logged in.</h3>}
            <p>Listen to music together virtually.</p>
            {auth ?
                <Link to="/createRoom" style={{ textDecoration: 'none'}}>
                    <Button variant="outlined" style={{ backgroundColor: "#1DB954"}}>
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