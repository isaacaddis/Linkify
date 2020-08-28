import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as QueryString from "query-string"


const FrontPage: React.FC = (props: any) => {
    console.log(`Got props: `)
    console.log(props)
    console.log(`Props location`)
    console.log(props.location)
    const params = QueryString.parse(props.location.search);
    const access_token = params.access_token;
    console.log(`Access Token: ${access_token}`)
    return (
        <React.Fragment>
            <h1>Linkify</h1>
            {access_token ? <h1>Welcome, {access_token}</h1> : <h2>Not logged in.</h2>}
            <p>Listen to music together virtually.</p>
            <Link to="/createRoom" style={{ textDecoration: 'none', backgroundColor: '#1DB954'}}>
                <Button variant="outlined" color="primary">
                    Create a Room
                </Button>
            </Link>
        </React.Fragment>
    );
}
export default FrontPage;