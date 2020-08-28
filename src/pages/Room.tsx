import React from "react";
import * as QueryString from "query-string"

// type RoomProps = {
//     roomName: string,
//     hostName: string
// }

const Room: React.SFC<{ location: any }> = (props) => {
    const params = QueryString.parse(props.location.search);
    const roomName = params.roomName;
    const hostName = params.hostName;
    return (
        <React.Fragment>
            <h1>Now in room: <strong>{roomName}</strong></h1>
            <h2>Host: {hostName}</h2>
        </React.Fragment>
    )
}

export default Room;