// index.html

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import io from 'socket.io-client';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '@/hooks/useAuth';
import TrackSearchResult from '@/components/TrackSearchResult';
import Player from '@/components/Player';
import Login from '@/components/Login';

let socket

const spotifyApi = new SpotifyWebApi({
  clientId: '8600f707689e46bd9426b2afd625d379',
})

function HomePage() {
    
    // Token stuff //
    
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
 
    const accessToken = useAuth(code);

    useEffect(() => {
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken);
      console.log('playlists: ', spotifyApi.getUserPlaylists(spotifyApi.getMe().id))
      console.log('user info: ', spotifyApi.getMe())
      console.log('saved tracks: ', spotifyApi.getMySavedTracks({ limit: 50}))
    }, [accessToken])


    // Search stuff //
    
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


    // Player stuff //

    const [playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track) {
      setPlayingTrack(track)
      setSearch('')
    }


    // Socket Stuff //

    const [test, setTester] = useState('being');

    useEffect(() => {
      socketInitializer();
    }, [])

    const socketInitializer = async () => {
      await fetch('/api/socket');

      socket = io();

      socket.on('connect', () => {
        console.log('socket connected')
      })

      socket.on('receiveMessage', (data) => {
        console.log('data: ', data);
        setTester(data.message);
      })
    }

    const sendMessage = async () => {
      let message = 'asdfasdfasdf'
      socket.emit('sendMessage', { message, room });
    };



    // Vote stuff //
    
    const [voteCount, setVoteCount] = useState(0)
    const [voteThreshold, setVoteThreshold] = useState(5) // set vote threshold here


    useEffect(() => {
      if (voteCount > voteThreshold) {
        setVoteCount(0)
        spotifyApi.skipToNext();
      } 
    },[voteCount])


    // Room Stuff //

    const [room, setRoom] = useState('');

    const joinRoom = () => {
      if (room !== '') {
        socket.emit('joinRoom', room);
      }
    };


  return (
    <div className='Content'>
      <div className='container'>
        <form className='searchcontainer'>
          <input className='searchbar'
            type="text"
            placeholder='Search Songs/Artists'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
          {searchResults.map( track => (
            <TrackSearchResult track={track} key={track?.uri} chooseTrack={chooseTrack} />
          ))}
        </div>
      </div>
      <div>
        <Login />
        <button onClick={() => setVoteCount(voteCount + 1)}>Skip</button>
        {voteCount}
        <br/>
        <div>
          <button onClick={sendMessage}> send message</button>
          {test}
          <input
            placeholder='Room ID...'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      </div>
      <div><Player accessToken={accessToken} trackUri={playingTrack?.uri}/></div>
    </div>
  );
}
        //<BasicTitle code={code}></BasicTitle>
        //<button><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Host</a></button>

export default HomePage