// Login.js

import React from "react";
import { useEffect, useState } from 'react';

const URL = 'https://skipp-er.herokuapp.com/'
//const URL = 'http://localhost:3000'

function Login(){
    const CLIENT_ID = '8600f707689e46bd9426b2afd625d379';
    const REDIRECT_URI = URL;
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'code';
    const SCOPE = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20playlist-read-private';
    return (
        <div className="loginBtn">
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
                <button className="main_button">
                        Login
                </button>
            </a>
        </div>
    )
}

export default Login