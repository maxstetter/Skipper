// index.html

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import io from 'socket.io-client';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '@/hooks/useAuth';
import TrackSearchResult from '@/components/TrackSearchResult';
import PlaylistResult from '@/components/PlaylistResult';
import Player from '@/components/Player';
import Login from '@/components/Login';
import genRoom from '@/hooks/genRoom';
import CurrentCard from '@/components/CurrentCard';
import CurrentVote from '@/components/CurrentVote';
import { useInterval } from '@/utils/Poller';
import axios from 'axios';

let socket
// pckg variables

let pckg_vote_count, pckg_current_song_artists, pckg_current_song_name, pckg_current_song_cover, pckg_vote_threshold, pckg_queue

const spotifyApi = new SpotifyWebApi({
  clientId: '8600f707689e46bd9426b2afd625d379',
})



// TODO:

// Figure out Room stuff: current issue is state objects will not save when altered by socket message.
// SOLUTION ^ use the correct way to set a state variable.
// Display certain stuff to guests.
// Style guest page.

// Update guest: host  --info->  guest.
// Request host for new information.

// current issue is that current song is undefined when loading. 
// possible solution is to update on the queued songs, when queue changes, update everything else.
// still need to make request update.

//TODO: need to rework update and request update logic. Current problem
// is 1: need to identify who(host) sends the update. 2: How to get socket
// to talk back and forth (send request --> get request --> send update).

// #2 SOLUTION: sockets talking kind of. search for 'doggishtoast'. Improve by checking how 'room' is sent..
// #1 POSSIBLE: use accessToken to identify host. For some reason it doesnt think the host has a token...


// TODO: 
// 1: Auto update clients from host. (whenever vital info changes, send update [useEffect]).
// 1 NOTE: on client connection, send them an update.

// 2: Display updated info in client view (On package receive, update my local values).
// 2 NOTE: How to package queue?

// 3: create confirm room and threshold pop up for host (Use pop up div. Used to set room and threshold.)
// 3 NOTE: ideally room should be set automatically and threshold can be changed.

// 4: How to determine who is host to send updates. see above TODO.
// 4 NOTE: only host sends updates. only clients request updates.

// 5: Style client view
// 5 NOTE: get rid of leftover stuff. Make look nice

// 6: Host: How to show current user's playlists / which playlist to play on load?
// 6 NOTE: currently hardcoded own playlist. Ability to select playlist?

// 7: Deploy server
// 7 NOTE: buy domain, probably use Github to host. maybe AWS if easy.

// WOULD BE NICE 
// - Ability to request songs.
// - Message of the day.
// - Vote on queued songs.
// - Regulate votes (only 1 vote per user per song).
// - Ability to add songs to playlist.
// - Search song adds to queue instead of auto play.


// How do I know when my song has changed?
// ^ SOLUTION: check song duration, set delay to this duration for a refresh function 
// that will simply check for a current song by using previous way once delay is done.
// ^^ SOLUTION OR: make guest request an update every specified period. ( might be easier bc websocket)
// duration = res->body->item->duration_ms

// When first being host, how do i set current song? Maybe async function?

// Final TODO:
// 1. DONE (could use work) confirmation pop up for host to set room and vote threshold
// 2. display playlists list for host instead of hard coded
// 3. polling system. IE: On song change, reset vote count.

// OPTIONS: 
// 1. display only user playlists. pagination. 
// 2. keep song search. add song to queue on click instead of auto play. Add song requests.

// FINAL THING FOR MVP:
// - Create a function that polls. HitSpotiyApi every ___ seconds.

function Delay(milliseconds){
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}


function HomePage() {
  
    // Token stuff //
    
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
 
    const accessToken = useAuth(code);

    useEffect(() => {
      if (!accessToken) return
      let username
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.getMe().then( res => {
        username = res?.body?.display_name
        setwhoami(whoami => username)
        //console.log('whoami: ', whoami)
      });

//      spotifyApi.getMyCurrentPlayingTrack().then( res => {
//        console.log('request for current song: ', res)
//        current_song_name = res?.body?.item?.name
//        console.log('current_song_name: ', current_song_name);
//        setCurrentSong(currentSong => current_song_name);
//      })


      console.log('Playlists: ', spotifyApi.getUserPlaylists(spotifyApi.getMe().id))
      console.log('user info: ', spotifyApi.getMe())
      console.log('saved tracks: ', spotifyApi.getMySavedTracks({ limit: 50}))
      //setRoom(genRoom())
      // update guests?
    }, [accessToken])


    // Search stuff //
    
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
      if(!search) return setSearchResults([])
      if(!accessToken) return

      let cancel = false
      spotifyApi.searchTracks(search).then(res => {
        setSearchResults(res?.body?.tracks?.items.map(track => {
          if (cancel) return 
          const smallestAlbumImage = track?.album?.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, track?.album?.images[0])
          return {
            artist: track.artists[0]?.name,
            title: track?.name,
            uri: track?.uri,
            albumUrl: smallestAlbumImage?.url,
          }
        }))
      })
      
      return () => cancel = true
    },[search, accessToken])


    // Player stuff //

    const [playingTrack, setPlayingTrack] = useState()
    const [userPlaylists, setUserPlaylists] = useState([])

    useEffect(() => {
      if (!accessToken) return
      
      spotifyApi.getUserPlaylists(spotifyApi.getMe().id, {limit: 50})
    //  axios.get('https://api.spotify.com/v1/me/playlists?limit=50', {
    //    headers: { Authorization: `Bearer ${spotifyApi.getAccessToken()}`  }
    //  })
      .then(res => {
        console.log('playlist res: ', res)
        setUserPlaylists(res?.body?.items.map(playlist => {
          const smallestPlaylistImage = playlist?.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, playlist?.images[0])
          return {
            title: playlist?.name,
            uri: playlist?.uri,
            playlistUrl: smallestPlaylistImage?.url,
          }
        }))
      })
      console.log('playlists: ', userPlaylists)

    }, [accessToken])
    
    // choosePlaylist piggy backs off of chooseTrack/playingTrack
    function choosePlaylist(playlist) {
      setPlayingTrack(playlist)
    }

    function chooseTrack(track) {
      setPlayingTrack(track)
      setSearch('')
    }

    function queueTrack(track) {
      if (spotifyApi.getAccessToken()) {
        const queue_url = `https://api.spotify.com/v1/me/player/queue?uri=${track?.uri}`
        axios.post(queue_url, null, {
          headers: { Authorization: `Bearer ${spotifyApi.getAccessToken()}`  },
        })
        .then((res) => {
          console.log('Queue response: ', res);
        })
        .catch((err) => {
          console.log('Error queuing: ', err)
        })
        setSearch('');
      }
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
        console.log('Socket connected.');
      })
      
      socket.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`)
      })

      socket.on('receiveMessage', (data) => {
        console.log('data: ', data);
        setTester(data.message);
      })

      socket.on('receiveVote', (data) => {
        //console.log('Vote: ', data);
        //console.log('message: ', test)
        setVoteCount( (voteCount) => voteCount + 1);
      })

      socket.on('receiveUpdate', (data) => {
        console.log(`Received an update: ${JSON.stringify(data)}`)
        setVoteCount((voteCount) => data?.pckg?.current_vote);
        setVoteThreshold((voteThreshold) => data?.pckg?.current_vote_threshold);
        setCurrentSongName((currentSongName) => data?.pckg?.current_song_name);
        setCurrentSongArtists((currentSongArtists) => data?.pckg?.current_song_artists);
        setCurrentSongCover((currentSongCover) => data?.pckg?.current_song_cover);
      })
      
      socket.on('receiveUpdateRequest', (data) => {
        // console.log(`Received an update request: `, data)
        if(spotifyApi.getAccessToken()) {
          HitSpotifyApi();
          let room = data?.room;
          console.log('received update request with: ', data)
          console.log('current vote count: ', voteCount);
          let pckg = {
            current_song_name: pckg_current_song_name,
            current_song_artists: pckg_current_song_artists,
            current_song_cover: pckg_current_song_cover,
            current_vote: pckg_vote_count,
            current_vote_threshold: pckg_vote_threshold,
          }
          socket.emit('sendUpdate', { pckg, room})
        }
      })
    }

    const sendMessage = async () => {
      let message = 'asdfasdfasdf'
      socket.emit('sendMessage', { message, room });
    };

    const sendVote = () => {
      let vote = '1';
      socket.emit('sendVote', { vote, room });
    };

    const sendUpdate = () => {
      console.log('sending an update')
      if (socket && accessToken) {
        HitSpotifyApi();
       // spotifyApi.getMyCurrentPlayingTrack().then( res => {
       //   console.log('request for current song: ', res)
       //   const smallestAlbumImage = res?.body?.item?.album?.images.reduce((smallest, image) => {
       //     if (image.height < smallest.height) return image
       //     return smallest
       //   }, res?.body?.item?.album?.images[0])
       //   //console.log('smallest image url', smallestAlbumImage.url);
       //   setCurrentSongName(currentSongName => res?.body?.item?.name);
       //   setCurrentSongArtists(currentSongArtists => res?.body?.item?.album?.artists);
       //   setCurrentSongCover(currentSongCover => smallestAlbumImage.url);
       // })

      }
      

      let pckg = {
        current_song_name: pckg_current_song_name,
        current_song_artists: pckg_current_song_artists,
        current_song_cover: pckg_current_song_cover,
        current_vote: pckg_vote_count,
        current_vote_threshold: pckg_vote_threshold,
      }

      socket.emit('sendUpdate', { pckg, room })
    };

    const sendUpdateRequest = () => {
      let message = `${socket.id} requests an update.`
      socket.emit('sendUpdateRequest', { message, room })
    }

    
    // Vote stuff //
    
    const [voteCount, setVoteCount] = useState(0);
    const [voteThreshold, setVoteThreshold] = useState(5); // set vote threshold here
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
      pckg_vote_count = voteCount
      console.log(`${pckg_vote_count} pcgk vote count`)
      if (voteCount >= voteThreshold) {
        setVoteCount(0)
        if (accessToken){
          spotifyApi.skipToNext().then( async () => {
            await Delay(1500);
            HitSpotifyApi();
           // spotifyApi.getMyCurrentPlayingTrack().then( res => {
           //   const smallestAlbumImage = res?.body?.item?.album?.images.reduce((smallest, image) => {
           //     if (image.height < smallest.height) return image
           //     return smallest
           //   }, res?.body?.item?.album?.images[0])
           //   setCurrentSongName(currentSongName => res?.body?.item?.name);
           //   setCurrentSongArtists(currentSongArtists => res?.body?.item?.album?.artists);
           //   setCurrentSongCover(currentSongCover => smallestAlbumImage.url);
           // })
          });
        }
      } 
      if (socket && accessToken) {
        sendUpdate()
      }
    },[voteCount])

    useEffect(() => {
      pckg_vote_threshold = voteThreshold;
      if (socket && accessToken) {
        sendUpdate()
      }
    },[voteThreshold])

    const skipCooldown = async () => {
      setDisabledBtn(true);
      await Delay(15000);
      setDisabledBtn(false)
    }


    // Room Stuff //

    const [room, setRoom] = useState('');

    const joinRoom = () => {
      if (room !== '') {
        socket.emit('joinRoom', room);
        let message = `${socket.id} requests an update.`
        socket.emit('sendUpdateRequest', { message, room })
      }
    };


    // Host or Join stuff //
    const [haveChosen, setChosen] = useState(false);
    const [amHost, setHost] = useState(false);
    const [amJoin, setJoin] = useState(false);
    const [popUp, setPopUp] = useState(true);

    function HostPopUp(){
      return (
        <div className='HostPopUp'>
          <div className='Disclaimer'>
            <h3>Disclaimer:</h3>
            <p>
              Spotify only allows accounts who are registered with the developer to
              use applications in development mode. Therefore users will NOT be able 
              to host Skipper sessions unless they are already registered to 'Skipper'.
            </p>
          </div>
          <div className='popRoomIdDiv'>
            Enter a room ID:
            <input
              placeholder='Room ID...'
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
          </div>
          <div className='popThresholdDiv'>
            Enter the vote skip threshold:
            <input
              placeholder='ex:5'
              onChange={(event) => {
                setVoteThreshold(event.target.value)
              }}
            />
          </div>
          <button className='startBtn' onClick={() => {setPopUp(false); joinRoom()}}>
            <span className='startBtnFront'>Start</span>
          </button>
        </div>
      )
    }

    
    // Update stuff //
    const [whoami, setwhoami] = useState();
    const [currentSongName, setCurrentSongName] = useState();
    const [currentSongArtists, setCurrentSongArtists] = useState();
    const [currentSongCover, setCurrentSongCover] = useState();
    const [currentSongId, setCurrentSongId] = useState();
    const [previousSongId, setPreviousSongId] = useState();
    const [queue, setQueue] = useState();

    useEffect(() => {
      //if(!accessToken) return
      //console.log(`new current name ${currentSongName}`)
      pckg_current_song_name = currentSongName;
      pckg_current_song_artists = currentSongArtists;
      pckg_current_song_cover = currentSongCover;
      if (socket && accessToken) {
        sendUpdate()
      }

    },[currentSongName, currentSongCover])

    function HitSpotifyApi(){
      spotifyApi.getMyCurrentPlayingTrack().then( res => {
        console.log('Hit spotifyApi: ', res);
        const smallestAlbumImage = res?.body?.item?.album?.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image
          return smallest
        }, res?.body?.item?.album?.images[0])

        let artists = []
        res?.body?.item?.artists.map((artist) => {
          return artists.push(artist.name)
        })
        
        // First time init of current song
        if(!previousSongId) {
          setPreviousSongId(previousSongId => res?.body?.item?.id)
          setCurrentSongId(currentSongId => res?.body?.item?.id)
        }

        if(previousSongId !== currentSongId) {
          console.log('new song!')
          setPreviousSongId(previousSongId => currentSongId);
          setVoteCount(voteCount => 0);
        }
        //console.log('previousSong: ',previousSongId);
        //console.log('currentSong: ',currentSongId);
        setCurrentSongId(currentSongId => res?.body?.item?.id);
        setCurrentSongName(currentSongName => res?.body?.item?.name);
        setCurrentSongArtists(currentSongArtists => artists);
        setCurrentSongCover(currentSongCover => smallestAlbumImage?.url);
      })
    };


    useEffect(() => {
      //console.log('new whoami:', whoami)
    },[whoami])

      useInterval(() => {
        if(spotifyApi.getAccessToken()){
          HitSpotifyApi();
        }
      }, 1000 * 5)


    // Main return //

  return (
    <div className='Content'>
        {accessToken ? 
          <div className='container'>
            {popUp ? HostPopUp() : ''}
            <div className='topHalfDiv'>
              <div className='infoDiv'>
                <div className='skipInfoDiv'>
                  Votes to Skip: {voteCount}/{voteThreshold}
                </div>
                <div className='roomInfoDiv'>
                  Room ID: {room}
                </div>
              </div>
              <div className='playerDiv'>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
              </div>
              <hr style={{margin: "15px"}}/>
              <div className='mainCard'>
                <form className='searchcontainer'>
                  <input className='searchbar'
                    type="text"
                    placeholder='Search Tracks To Queue'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                <div className='mainContainer'>
                  {searchResults.map( track => (
                    <TrackSearchResult track={track} key={track?.uri} queueTrack={queueTrack} />
                  ))}
                </div>
              </div>
              <div className='mainCard'>
                <div className='mainCardTitle'>
                  Your Playlists:
                </div>
                <div className='mainContainer'>
                  {userPlaylists.map(playlist => {
                    return (<PlaylistResult playlist={playlist} key={playlist?.uri} choosePlaylist={choosePlaylist}/>)
                    
                  })}
                </div>
              </div>
            </div>
          </div>
          :
          ''
        }
      {accessToken ? 
        ''
      :
        <div>
          {amJoin ? 
            <div className='guestDiv'>
              <div className='guestRoomDiv'>
                <div className='guestInputJoinDiv'>
                  <input
                    className='guestRoomInput'
                    placeholder='Room ID...'
                    onChange={(event) => {
                      setRoom(event.target.value);
                    }}
                  />
                  <button className='joinRoomBtn' onClick={joinRoom}>
                    <span className='joinRoomBtnFront'>Join</span>
                  </button>
                </div>
                <div className='displayRoomDiv'>
                  Room:
                  <br/>
                  {room}
                </div>
              </div>
              <div className='guestVoteDiv'>
                <CurrentVote count={voteCount} threshold={voteThreshold}/>
                <button className='skipBtn' onClick={() => {setVoteCount(voteCount + 1), sendVote(), skipCooldown()}} disabled={disabledBtn}>
                  <span className='skipBtnFront'>Skip!</span>
                </button>
              </div>
              <CurrentCard song_title={currentSongName} song_artists={currentSongArtists} song_cover={currentSongCover}/>
              <div className='goBackDiv'>
                <button className='goBackBtn' onClick={() => {setJoin(false); setHost(false); setChosen(false)}}>
                  <span className='goBackBtnFront'>go back</span>
                </button>
              </div>
            </div>
          :
            ''
          }

          {amHost ? 
            <div className='hostDiv'>
              <Login />
              <button className='host_back_button' onClick={() => {setJoin(false); setHost(false); setChosen(false)}}>go back</button>
            </div>
          :
            ''
          }

          {
            haveChosen ?
            ''
            :
            <div className='chosingDiv'>
              <div className='skipperTitleDiv'>
                <div className='skipperTitle'>
                  skipper
                </div>
              </div>
              <div className='amHostDiv'>
                {amHost ? '' : <div className='hostDivBtn' onClick={() => {setHost(!amHost); setJoin(false); setChosen(true);}}>Host</div>}
              </div>
              <div className='amJoinDiv'>
                {amJoin ? '' : <div className='joinDivBtn' onClick={() => {setJoin(!amJoin); setHost(false); setChosen(true)}}>Join</div>}
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
}

        //<BasicTitle code={code}></BasicTitle>
        //<button><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Host</a></button>

        // This was in the amjoin section.
        //      <div>
        //        <button onClick={sendMessage}> send message</button>
        //        {test}
        //        <button onClick={sendUpdateRequest}> Request Update</button>
        //      </div>
export default HomePage