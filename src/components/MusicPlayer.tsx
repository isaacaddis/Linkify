import React from "react";
import PropTypes, { InferProps } from 'prop-types';
// import SpotifyPlayerContainer from "./SpotifyPlayerContainer";
import SpotifyPlayer from 'react-spotify-web-playback';

type MusicProps = {
    accessToken: string
}

const MusicPlayer: React.SFC<MusicProps> = (props) => {
    return (
        <div className="musicPlayer">
            <SpotifyPlayer
                token={props.accessToken}
                uris={['spotify:artist:23fqKkggKUBHNkbKtXEls4']}
            />
        </div>
    )
}

export default MusicPlayer;