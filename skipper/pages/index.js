// index.html

import { useState, useEffect } from 'react';
import BasicTitle from '../components/Basic';
import { useSearchParams } from 'next/navigation';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '@/hooks/useAuth';

const spotifyApi = new SpotifyWebApi({
  clientId: '8600f707689e46bd9426b2afd625d379',
})

function HomePage() {
    const CLIENT_ID = '8600f707689e46bd9426b2afd625d379';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'code';
    const SCOPE = 'user-top-read';
    
    //Workaround because nextjs doesnt support window
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    //console.log('code: ', code);

    const accessToken = useAuth(code);

    useEffect(() => {
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.getMyTopArtists().then(res => {
        console.log('kkk', res)
      })
    }, [accessToken])


  
  return (
    <div className='Content'>
      <div>
        insert retard
        <BasicTitle code={code}></BasicTitle>
      </div>
      <div>
        <button><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Host a session</a></button>
        <br/>
        <button>Join</button>
      </div>
      <div>
      </div>
    </div>
  );
}

export default HomePage