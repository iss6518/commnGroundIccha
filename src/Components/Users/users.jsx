import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom';

//import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `http://127.0.0.1:8000/users`;
// const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function AddGameForm({ setError, fetchGames, cancel, visible }) {
  // useState keeps track of state. name is initially '' then setName is a function 
  // that updates name as state changes
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNumber = (event) => { setNumber(event.target.value); };

  // called on submit button click
  const addGame = (event) => {
    event.preventDefault();
    axios.post(USERS_ENDPOINT, { name: name, numPlayers: number }) // sends a post request
    //.then(fetchGames)
    .then(() => {
      setError('');
      fetchGames();
    })
    .catch((error) => {
      setError(error.response.data.message);
    });
  };
  
  //what does this do?
  if (!visible) return null;
  return(
    <form>
        <label htmlFor="name"> 
          Name
        </label>
        <input required type="text" id="name" value={name} onChange={changeName}/>

        <label htmlFor="number-of-players"> 
          Number of players
        </label>
        <input required type="number" id="number-of-players" value={number} onChange={changeNumber}/>

        <button type="submit" onClick={addGame}>Submit</button>
        <button type="button" onClick={cancel}>Cancel</button>
    </form>
  );
}
AddGameForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchGames: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

// ErrorMessage AND Game used in the return of Games() function to display 
// an error message if there is one and the list of games where each game is clickable 
// to a new page about that game
function ErrorMessage({message}) {
  return (
    <div className='error-message'>
      {message}
    </div>
  );
}
ErrorMessage.prototype = {
  message: propTypes.string.isRequired,
};

// Link is from react router dom: to navigate to another page by clicking or tapping on it.
function Game({game}) {
  const {user_name, numPlayers} = game; 
  return (
    <Link to={user_name}>
      <div className="game-container">
        <h2>{user_name}</h2>
        <p>
          Players: {numPlayers}
        </p>
      </div>
    </Link>
  );
}
Game.propTypes = {
  game: propTypes.shape({
    user_name: propTypes.string.isRequired,
    numPlayers: propTypes.number.isRequired,
  }).isRequired,
};

function gamesObjectToArray({Data}) {
  const keys = Object.keys(Data);
  const games = keys.map((key) => Data[key]);
  return games;
}

function Games() { //fetching from backend
  const [error, setError] = useState('');
  const [games, setGames] = useState([]);
  const [addingGame, setAddingGame] = useState(false);

  const fetchGames = () => {
    axios.get(USERS_ENDPOINT)
    .then(({data})=> setGames(gamesObjectToArray(data)))
    .catch(() => { setError('Something went wrong'); }); //something bad
  };

  // if user clicks on Add Game button toggle on and off visibility of add form
  const showAddGameForm = () => { setAddingGame(true); };
  const hideAddGameForm = () => { setAddingGame(false); };

  useEffect(
    fetchGames,
    [],
    // if THIS isempty meaning it'll only
    // be called on initial render of app
  );

  return (
  <div className="wrapper">
    <header>
      <h1>
        Games - but new
      </h1>
      <button type="button" onClick={showAddGameForm}>
        Add a Game
      </button>
    </header>

    <AddGameForm
      visible={addingGame}
      cancel={hideAddGameForm}
      fetchGames={fetchGames}
      setError={setError}
    />
    {error && <ErrorMessage message={error} />}
    {games.map((game) => <Game key={game.name} game={game} />)}
  </div>
  );
}

export default Games;