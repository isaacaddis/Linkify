type room = {
    roomName: string,
    hostName: string,
    queue?: any[], //Song queue
}

const dataStore = new Map<string, room>();

/**
 * 
 * @param id roomid (uniquely generated)
 */
export const createRoom = (id: string, room: room) => {
    dataStore.set(id, room);
}
