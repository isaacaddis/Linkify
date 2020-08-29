import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

type SnackbarProps = {
    open: boolean,
    onClose: () => any,
    message: string,
    autoHideDuration?: number
}

/**
 * A dialog for displaying error messages
 * @param autoHideDuration - optional, defaults to 3000ms
 */
const ErrorSnackbar: React.SFC<SnackbarProps> = ({ open, onClose, message, autoHideDuration = 3000 }) => {
    return (
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}>
            <Alert onClose={onClose} severity="error" >
                {message}
            </Alert>
        </Snackbar>
    );
}
export default ErrorSnackbar;