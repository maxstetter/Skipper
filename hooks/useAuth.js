import { useState, useEffect } from "react";
import axios from "axios";

const URL = 'https://skipp-er.herokuapp.com/'
// const URL = 'https://localhost:3000/'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        //axios.post('http://localhost:3000/api/login', {
        axios.post(`${URL}api/login`, {
            code,
        })
        .then(res => {
            //console.log('data: ', res.data);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, null, '/');
        })
        .catch(() => {
            window.location = "/";
        })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        const interval = setInterval(() => {
            axios.post(`${URL}api/refresh`, {
                refreshToken,
            })
            .then(res => {
                //console.log('data: ', res.data);
                setAccessToken(res.data.accessToken);
                setExpiresIn(res.data.expiresIn);
            })
            .catch(() => {
                window.location = "/";
            })
        }, (expiresIn - 60) * 1000)
        return () => clearInterval(interval);
    },[refreshToken, expiresIn])
    
    return accessToken;
}