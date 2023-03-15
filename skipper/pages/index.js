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
    }, [accessToken])

    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
      if(!search) return setSearchResults([])
      if(!accessToken) return

      let cancel = false
      spotifyApi.searchTracks(search).then(res => {
        setSearchResults(res.body.tracks.items.map(track => {
          if (cancel) return 
          const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, track.album.images[0])
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        }))
      })
      
      return () => cancel = true
    },[search, accessToken])

  
  return (
    <div className='Content'>
      <div className='container'>
        <form>
          <input 
            type="text"
            placeholder='Search Songs/Artists'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
          Songs
          {searchResults.map( track => (
            <TrackSearchResult track={track} key={track.uri} />
          ))}
        </div>
      </div>
      <div>
        <button><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Host a session</a></button>
        <br/>
        <button>Join</button>
      </div>
    </div>
  );
}
        //<BasicTitle code={code}></BasicTitle>

export default HomePage