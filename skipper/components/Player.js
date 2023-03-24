import React, { useState, useEffect } from "react";
import SpotifyPLayer from "react-spotify-web-playback"

function Player({ accessToken, trackUri}) {
    const [play, setPlay] = useState(false)

    useEffect(() => {
        setPlay(true)

    }, [trackUri])
    if (!accessToken) return null
    return <SpotifyPLayer
    token={accessToken}
    showSaveIcon
    callback={state => {
        if(!state.isPlaying) setPlay(false)
    }}
    play={true}
    uris={trackUri ? [trackUri] : []}
    />
}

export default Player;