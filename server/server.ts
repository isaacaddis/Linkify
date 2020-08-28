import bodyParser from "body-parser";
import express from "express";
import { handleLogin, handleCallback, handleRefreshToken } from "./routes/auth";

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));


app.get('/login', handleLogin);

app.get('/callback', handleCallback);

app.get('/refresh_token', handleRefreshToken);
