import { createRoom, getRoom } from "../Store";
const uuid = require('uuid');

export const handleCreateRoom = (req: any, res: any) => {
    const roomName = req.body.roomName;
    const hostName = req.body.hostName;
    const roomId = uuid.v4();
    const success = createRoom(roomId, { roomName: roomName, hostName: hostName, queue: null });
    if (success) {
        //redirect
        const uri = `http://localhost:3000/room?roomId=${roomId}`;
        res.json({ uri: uri });
    }
    else {
        res.sendStatus(400);
    }
}

export const handleGetRoom = (req: any, res: any) => {
    const roomId = req.query.id;
    console.log(`Got request to retrieve room ${roomId}`)
    const room = getRoom(roomId);
    console.log(room)
    res.json({room: room});
}

export const handleGetQueue = (req: any, res: any) => {
    const roomId = req.query.id;
    console.log(`Got request to retrieve queue for room ${roomId}`)
    const room = getRoom(roomId);
    const queue = room.queue;
    res.json({queue: queue})
}