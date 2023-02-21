// index.html

import { useState, useEffect } from 'react';
import BasicTitle from '../components/Basic';
import { useSearchParams } from 'next/navigation';

function HomePage() {
    const CLIENT_ID = '8600f707689e46bd9426b2afd625d379';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'code';
    const SCOPE = 'user-top-read';

    const [token, setToken] = useState("");
    const [data, setData] = useState([]);
    
    //Workaround because nextjs doesnt support window
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    console.log('code: ', code);


    useEffect(() => {

        let token = window.localStorage.getItem("token");
        if(!token) {
            let urlParams = new URLSearchParams(window.location.hash.replace('#','?'));
            let token = urlParams.get('access_token');

            window.localStorage.setItem('token', token);
            setToken(token);
        }

        fetch('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            console.log('data: ', data);
          })
        console.log('token: ', token)
        console.log('dataL: ', data)
    }, [])

  return (
    <div className='Content'>
      <div>
        {code}
        <br></br>
        insert retard
        <BasicTitle code={code}></BasicTitle>
      </div>
      <div>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Host</a>
        <button>Join</button>
      </div>
      <div>
      </div>
    </div>
  );
}

export default HomePage