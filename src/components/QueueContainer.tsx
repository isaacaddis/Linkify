import React from "react";
import { Grid, Typography } from "@material-ui/core"
import { FormStyles } from '../ui/Util';
import ClearIcon from '@material-ui/icons/Clear';

type QueueContainerProps = {
    roomId: any,
    queue: any[]
}

type QueueViewProps = {
    roomId: any,
    uri: string
}

const handleDeleteEntry = async (roomId: string, uri: string) => {

    const deleteEndpoint = `http://localhost:5000/deleteRoomEntry`
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
    const response = await fetch(deleteEndpoint, options);
    const json = await response.json();
    const new_queue = json.new_queue;
    console.log(`Page will update with new queue: `)
    console.log(new_queue);
}

const QueueView: React.SFC<QueueViewProps> = (props) => {
    const classes = FormStyles();
    return (
        <Grid container alignItems="center" style={{ boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.25)", marginLeft: 120, marginRight: 50, marginBottom: 8, backgroundColor: "#1DB954", borderRadius: 15, padding: "8px 5px" }}  >
            <Grid item style={{ width: "75%", }} >
                <Typography className={classes.text} >
                    {props.uri}
                </Typography>
            </Grid>
            <Grid item style={{ width: "25%", }} >
                <ClearIcon onClick={() => handleDeleteEntry(props.roomId, props.uri)} />
            </Grid>
        </Grid>
    )
}

const QueueContainer: React.SFC<QueueContainerProps> = (props) => {
    const entries = props.queue.map((entry) => {
        return (<QueueView roomId={props.roomId} uri={entry} />)
    });
    return (
        <Grid container justify="center">
            {entries}
        </Grid>
    );

}

export default QueueContainer;