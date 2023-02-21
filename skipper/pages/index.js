// index.html
import { setRevalidateHeaders } from 'next/dist/server/send-payload';
import { useState, useEffect } from 'react';
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}


function getTopArtists(token){
  let retrieved = '';
        fetch('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
          .then((res) => res.json())
          .then((data) => {
            retrieved = data;
            console.log('Retrieved: ', retrieved);
          })
        return retrieved;
}


//TODO: fix how to store stuff from the spotify api.
function HomePage() {
    const CLIENT_ID = '8600f707689e46bd9426b2afd625d379'
    const REDIRECT_URI = 'http://localhost:3000'
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const RESPONSE_TYPE = 'token'
    const SCOPE = 'user-top-read'

    const [token, setToken] = useState("");
    const [data, setData] = useState([]);

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

  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div className='Content'>
      <div>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Host</a>
        <button>Join</button>
      </div>
      <button onClick={handleClick}>Like ({likes})</button>
      <div>
      </div>
    </div>
  );
}
        //{data.items.map((artist) => {
          //return (
            //<div>{artist.name}</div>
          //)
        //})}

export default HomePage