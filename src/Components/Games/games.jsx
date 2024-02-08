import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Games() {
  const [error, setError] = useState('Initial message');
  const [games, setGames] = useState([]);

  useEffect(
    () => {
      // call to bkend to get additional info
      axios.get('http://localhost:8000/users')
        .then((response) => {
          const gamesObject = response.data.Data;
          const keys = Object.keys(gamesObject);
          const gamesArray = keys.map((key) => gamesObject[key]);
          setGames(gamesArray);
        }) // something good
        .catch(() => { setError('Something went wrong'); }); //something bad
    },
    [],
    // if THIS isempty meaning it'll only
    // be called on initial render of app
  );

  return (
  <div className="wrapper">
    <h1>
      Games - but new
    </h1>
    {error && (
      <div className="error-message">
      {error}
      </div>
    )}
    {games.map((game) => (
      <div className="game-container">
        <h2>{game.user_name}</h2>
      </div>
    ))}
  </div>
  );
}

export default Games;