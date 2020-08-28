import { createRoom } from "../Store";
const uuid = require('uuid');

export const handleCreateRoom = (req: any, res: any) => {
    const roomName = req.body.roomName;
    const hostName = req.body.hostName;
    const roomId = uuid.v4();
    const success = createRoom(roomId, { roomName: roomName, hostName: hostName });
    (success ? res.sendStatus(200) : res.sendStatus(400))
}