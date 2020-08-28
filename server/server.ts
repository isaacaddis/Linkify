import bodyParser from "body-parser";
import express from "express";
import { handleLogin, handleCallback, handleRefreshToken } from "./routes/auth";

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require("cookie-parser");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
    next();
 });

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));


app.get('/login', cors(), handleLogin);

app.get('/callback', handleCallback);

app.get('/refresh_token', handleRefreshToken);
