// TrackSearchResult.js

import React from "react";


function TrackSearchResult({ track, queueTrack }){
    function handlePlay() {
        queueTrack(track)
    }

    return(
    <div className="trackSearchResultCard">
        <div className="trackSearchResultContainer">
            <div className="tracksearchresult"
                style={{cursor: "pointer", }}
                onClick={handlePlay}
            >
                <img src={track?.albumUrl} style={{ height: "64px", width: "64px"}} />
                <div className="trackinfo">
                    <div>{track?.title}</div>
                    <div className="trackartist">{track?.artist}</div>
                </div>
            </div>   
        </div>
    </div>
    )
}

export default TrackSearchResult;