type room = {
    roomName: string,
    hostName: string,
    queue: any[], //Song queue
}

/**
 * @returns the uri of a spotify
 */
const getRandomSong = () => {
    const defaultSongs = [
        "spotify:artist:23fqKkggKUBHNkbKtXEls4",
        "spotify:artist:3srPc1Mytv5GmTWqsQuoXW",
        "spotify:artist:3PWp9R5HvbQgxI5KBx5kVd",
        "spotify:artist:1EowJ1WwkMzkCkRomFhui7",
        "spotify:artist:3NTbOmzlj2cL86XFuDVFvZ",
    ]
    return defaultSongs[Math.floor(Math.random() * defaultSongs.length)];
}

const dataStore = new Map<string, room>();

/**
 * 
 * @param id roomid (uniquely generated)
 */
export const createRoom = (id: string, room: room) => {
    const randomSong = getRandomSong();
    room.queue = [randomSong];
    console.log(`Picked random song: ${randomSong}`)
    console.log(`Creating room: `)
    console.log(room)
    dataStore.set(id, room);
    return true;
}

/**
 * Given a room [id], returns the corresponding room from the datastore
 * @param id 
 * @throws if [id] is not in the dataStore.
 */
export const getRoom = (id: string) => {
    return dataStore.get(id);
}