import express from "express";
import { handleLogin, handleCallback, handleRefreshToken } from "./routes/auth";
import { handleCreateRoom, handleGetRoom, handleGetQueue } from "./routes/rooms"
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
const port = process.env.PORT || 5000;




// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req: any, res: any) => {
    console.log(`Req query: `)
    console.log(req.query)
    const access_token = req.query.access_token;
    const uri = `http://localhost:3000/?access_token=${access_token}`;
    console.log(`Redirecting to ${uri} ...`)
    res.redirect(uri)
})

app.get('/login', handleLogin);

app.get('/callback', handleCallback);

app.get('/refresh_token', handleRefreshToken);

app.get('/room/:id', handleGetRoom);

app.get('/getQueue', handleGetQueue);


app.post('/createRoom', handleCreateRoom);
