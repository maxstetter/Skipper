// index.html
import { useState } from 'react';
import Login from '../components/Login.js';
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

function HomePage() {
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div className='Content'>
      <Login />
      
      <button onClick={handleClick}>Like ({likes})</button>
      <div className='CurrentSongDiv'>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </div>
    </div>
  );
}

export default HomePage