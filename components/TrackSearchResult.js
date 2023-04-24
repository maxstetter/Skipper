//TODO: leave off here. need to display track results.
import React from "react";


function TrackSearchResult({ track, queueTrack }){
    function handlePlay() {
        queueTrack(track)
    }

    return(
     <div className="tracksearchresult"
        style={{cursor: "pointer", border: "1px solid black"}}
        onClick={handlePlay}
     >
        <img src={track?.albumUrl} style={{ height: "64px", width: "64px"}} />
        <div className="trackinfo">
            <div>{track?.title}</div>
            <div className="trackartist">{track?.artist}</div>
        </div>
     </div>   
    )
}

export default TrackSearchResult;