import React, { useState, useCallback } from "react";
import PropTypes, { InferProps } from 'prop-types';
// import SpotifyPlayerContainer from "./SpotifyPlayerContainer";
import SpotifyWebPlayer, { STATUS } from 'react-spotify-web-playback';

type MusicProps = {
    accessToken: string
}

const MusicPlayer: React.SFC<MusicProps> = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
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
            {/* <SpotifyWebPlayer
                autoPlay={false}
                callback={handleCallback}
                persistDeviceSelection
                play={isPlaying}
                showSaveIcon
                syncExternalDevice
                token={token}
                styles={{
                    sliderColor: '#1cb954',
                }}
                uris={URIs}
            /> */}
        </div>
    )
}

export default MusicPlayer;