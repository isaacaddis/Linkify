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
                    style: {
                        backgroundColor: "#1C2B56",
                    },
                }}
                open={props.open}
                aria-labelledby="form-dialog-title" >
                <DialogTitle style={{ color: 'white' }} disableTypography id="form-dialog-title">
                    You're all set!
                </DialogTitle>
                <h4>Share this link with your friends: </h4>
                <p>{props.url}</p>
                <CopyToClipboard text={props.url} onCopy={() => setCopied(true)}>
                    <Button color="default">Copy</Button>
                </CopyToClipboard>
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