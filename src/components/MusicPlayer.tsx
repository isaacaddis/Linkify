import React from "react";
import PropTypes, { InferProps } from 'prop-types';
import SpotifyPlayer from 'react-spotify-web-playback';

type MusicProps = {
    accessToken: string
}

const MusicPlayer: React.SFC<MusicProps> = (props) => {
    return (
        <div className="musicPlayer">
            <SpotifyPlayer
                token={props.accessToken}
                uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
                styles={{
                    bgColor: '#333',
                    color: '#fff',
                    loaderColor: '#fff',
                    sliderColor: '#1cb954',
                    savedColor: '#fff',
                    trackArtistColor: '#ccc',
                    trackNameColor: '#fff',
                  }}
            />;
        </div>
    )
}

export default MusicPlayer;