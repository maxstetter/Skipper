import React from "react";


function PlaylistResult({ playlist, choosePlaylist }){
    function handleChoose() {
        choosePlaylist(playlist)
    }

    return(
     <div className="playlistResult"
        style={{cursor: "pointer", border: "1px solid black"}}
        onClick={handleChoose}
     >
        <img src={playlist?.playlistUrl} style={{ height: "64px", width: "64px"}} />
        <div className="trackinfo">
            <div>{playlist?.title}</div>
        </div>
     </div>   
    )
}

export default PlaylistResult;