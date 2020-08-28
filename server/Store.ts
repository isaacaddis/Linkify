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
    return true;
}

/**
 * Given a room [id], returns the corresponding room from the datastore
 * @param id 
 * @throws if [id] is not in the dataStore.
 */
export const getRoom = (id: string) => {
    dataStore.get(id);
}