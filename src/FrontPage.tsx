import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const FrontPage: React.FC = (props: any) => {
    console.log(`Got props: `)
    console.log(props)
    return (
        <React.Fragment>
            <h1>Linkify</h1>
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