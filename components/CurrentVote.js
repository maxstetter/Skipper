import React from "react";

export default function CurrentVote({count, threshold}){
    return (
        <div className="CurrentVote">
            <div>Votes: {count}/{threshold}</div>
        </div>
    )
}