import { createRoom, getRoom } from "../Store";
const uuid = require('uuid');

export const handleCreateRoom = (req: any, res: any) => {
    const roomName = req.body.roomName;
    const hostName = req.body.hostName;
    const roomId = uuid.v4();
    const success = createRoom(roomId, { roomName: roomName, hostName: hostName, queue: null });
    if (success) {
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
    res.json({ room: room });
}


export const handleAddQueue = (req: any, res: any) => {
    const roomId = req.body.roomId;
    const uri = req.body.uri;
    const room = getRoom(roomId);
    room.queue.push(uri);
    res.sendStatus(200);
}

export const handleDeleteRoomEntry = (req: any, res: any) => {

    const roomId = req.body.roomId;
    const uri = req.body.uri;
    console.log(`Got request to delete uri ${uri} in room ${roomId}`)
    const room = getRoom(roomId);
    const _queue = room.queue;
    let queue; 
    for (let i = 0, len = _queue.length; i < len; i++) {
        const entry = _queue[i];
        if (entry.toLowerCase() === uri.toLowerCase()) {
            console.log(`Splicing entry ${entry} ...`)
            queue = _queue.splice(i, 1);
        }
    }
    res.json({new_queue: queue});
}