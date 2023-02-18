import React from "react";
import { useEffect, useState } from 'react';

function Login(){
    const CLIENT_ID = '8600f707689e46bd9426b2afd625d379'
    const REDIRECT_URI = 'http://localhost:3000'
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const RESPONSE_TYPE = 'token'

    const [token, setToken] = useState("");

    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.hash.replace('#','?'));
        let token = urlParams.get('access_token');

        setToken(token);
    }, [])

    return (
        <div>
            <h1>Skipper</h1>
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>login</a>
        </div>
    )
}

export default Login