import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Grow from '@material-ui/core/Grow';
import CopyToClipboard from "react-copy-to-clipboard"
import { Button } from '@material-ui/core';
import SuccessSnackbar from './SuccessSnackbar';

type RoomPreviewProps = {
    url: string,
    open: boolean,
}

const RoomPreviewDialog: React.SFC<RoomPreviewProps> = (props) => {
    const [copied, setCopied] = useState(false);
    //TODO maybe display snackbar?
    return (
        <React.Fragment>
            <Dialog
                maxWidth="xl"
                TransitionComponent={Grow}
                PaperProps={{
                }}
                open={props.open}
                aria-labelledby="form-dialog-title" >
                <DialogTitle style={{ }} disableTypography id="form-dialog-title">
                    <h1>You're all set!</h1>
                </DialogTitle>
                <DialogContent>
                    <h4>Share this link with your friends: </h4>
                    <p>{props.url}</p>
                    <CopyToClipboard text={props.url} onCopy={() => setCopied(true)}>
                        <Button style={{ backgroundColor: "#1DB954"}}>Copy</Button>
                    </CopyToClipboard>
                </DialogContent>
            </Dialog>
            <SuccessSnackbar
                open={copied}
                onClose={() => setCopied(false)}
                message="Copied 🎉"
            />
        </React.Fragment>
    )
}
export default RoomPreviewDialog