import React, { useState, useCallback } from "react";
import SpotifyWebPlayer, { STATUS } from 'react-spotify-web-playback';

type MusicProps = {
    accessToken: string,
    queue: string[],
    onSongFinished: () => any
}

const MusicPlayer: React.SFC<MusicProps> = (props) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const handleCallback = useCallback(({ type, ...state }) => {
        console.log("STATE: ")
        console.log(state);
        console.groupEnd();

        const position = state.position;

        if (position === 100) {
            console.log("Song finished");
            props.onSongFinished();
        }

        setIsPlaying(state.isPlaying);

        if (state.status === STATUS.ERROR && state.errorType === 'authentication_error') {
            console.log(`Authentication error ;()`)
        }
    }, []);

    return (
        <div className="musicPlayer">
            <>{isPlaying ? <h2>Now Playing</h2> : <h2>Paused</h2>}</>
            <SpotifyWebPlayer
                autoPlay={true}
                token={props.accessToken}
                uris={props.queue}
                callback={handleCallback}
                persistDeviceSelection
                magnifySliderOnHover={true}
                play={isPlaying}
                styles={{
                    sliderColor: '#1cb954',
                }}
            />
        </div>
    )
}

export default MusicPlayer;