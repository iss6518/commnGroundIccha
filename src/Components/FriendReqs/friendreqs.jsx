import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function FriendReqs({ setError, get, cancel, visible }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNumber = (event) => { setNumber(event.target.value); };

  const addGame = (event) => {
    event.preventDefault();
    axios.post(USERS_ENDPOINT, { name: name, numPlayers: number }) // sends a post request
    .then(() => {
      setError('');
      get();
    })
    .catch((error) => {
      setError(error.response.data.message);
    });
  };
  
  //test
  // if (!visible) return null;
  return(
    <form>
        <label htmlFor="name"> 
          Name
        </label>
        <input type="text" id="name" value={name} onChange={changeName}/>
        <label htmlFor="name"> 
          Number
        </label>
        <input type="number" id="number" value={number} onChange={changeNumber}/>
        <button type="submit" onClick={addGame}>Submit</button>
        <button type="button" onClick={cancel}>Cancel</button>
    </form>
  );
}

// for adding cancel/visible
// **** TODO need to figure this out
FriendReqs.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  get: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function Matches() { //fetching from backend
  const [error, setError] = useState('');
  const [matches, setMatches] = useState([]);
  // const [addingGame, setAddingGame] = useState(true);

  const get = () => {
    axios.get(USERS_ENDPOINT)
    .then((response) => {
      const matchesObject = response.data.Data;
      const keys = Object.keys(matchesObject);
      const MatchesArray = keys.map((key) => matchesObject[key]);
      setMatches(gamesArray);
      console.log(response);
    }) // something good
    .catch(() => { setError('Something went wrong'); }); //something bad
  };

  // const showAddGameForm = () => { setAddingGame(true); };
  // const hideAddGameForm = () => { setAddingGame(false); };

  useEffect(
    get,
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
    <FriendReqs 
    setError={setError}
    get={get}
    // cancel={hideFriendReqs}
    />
    {matches.map((game) => (
      <div className="friend-requests">
        <h2>{game.user_name}</h2>
      </div>
    ))}
  </div>
  );
}

export default Games;