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
        console.log('nextTracks: ', state.nextTracks)
    }}
    play={true}
    // Instead of hard coded playlist, have a list of available playlists.
    // Similar to the trackUri set up, except with playlist uris.
    uris={trackUri ? [trackUri] : ["spotify:playlist:7lMK6wzrVhd98gizttAlaK"]}
    />
}

export default Player;