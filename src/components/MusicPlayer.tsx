import React, { useState, useCallback } from "react";
import SpotifyWebPlayer, { STATUS } from 'react-spotify-web-playback';

type MusicProps = {
    accessToken: string
}

const MusicPlayer: React.SFC<MusicProps> = (props) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const handleCallback = useCallback(({ type, ...state }) => {
        console.group(`RSWP: ${type}`);
        console.log(state);
        console.groupEnd();

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
                uris={['spotify:artist:23fqKkggKUBHNkbKtXEls4']}
                callback={handleCallback}
                persistDeviceSelection
                play={isPlaying}
                showSaveIcon
                styles={{
                    sliderColor: '#1cb954',
                }}
            />
        </div>
    )
}

export default MusicPlayer;