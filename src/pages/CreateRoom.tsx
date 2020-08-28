import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { verifyAuth } from "./auth/Auth";


const CreateRoom: React.FC = () => {
    const isAuthenticated = verifyAuth();
    return (
        <React.Fragment>
            <h1>Create a Room</h1>
            <div>
                {!isAuthenticated ?
                    <p> You're logged in!</p>
                    :
                    <Button href="http://localhost:5000/login" style={{ textDecoration: "none", backgroundColor: "#1DB954" }}>Login to Spotify</Button>
                }
            </div>
        </React.Fragment >
    );
}

export default CreateRoom;