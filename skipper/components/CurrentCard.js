import React from "react";

export default function CurrentCard({song_title, song_artists, song_cover}){
    if (song_artists) {
        var artists = song_artists.map(artist => { return (<span>{artist} </span>)})
    }
return (
    <div className="CurrentCard">
        Currently playing:
        <div className="CurrentContainer">
            <div><img src={song_cover}/></div>
            <div className="trackinfo">
                <div>{song_title}</div>
                <div className="trackartist">{artists}</div>
            </div>
        </div>
    </div>
)
}