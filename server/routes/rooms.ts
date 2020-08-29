import { createRoom, getRoom } from "../Store";
const uuid = require('uuid');

export const handleCreateRoom = (req: any, res: any) => {
    const roomName = req.body.roomName;
    const hostName = req.body.hostName;
    const roomId = uuid.v4();
    const success = createRoom(roomId, { roomName: roomName, hostName: hostName });
    if (success) {
        //redirect
        const uri = `http://localhost:3000/room?roomName=${roomName}&hostName=${hostName}`;
        res.json({ uri: uri });
    }
    else {
        res.sendStatus(400);
    }
}

export const handleGetRoom = (req: any, res: any) => {
    const roomId = req.query.id;
    const room = getRoom(roomId);
    res.json(room);
}