import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const FormStyles = makeStyles({
    text: {
        color: "white",
        fontSize: "24px",
        padding: 20,
        // backgroundColor: "#233769",
    },
    input: {
        color: "white",
    },
    label: {
        color: "white",
    },
    button: {
        backgroundColor: "#1DB954",
        color: "white",
        textTransform: "none",
        "&:hover": {
            backgroundColor: "#1DB954"
        },
    },
});