import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';


const USERS_ENDPOINT = `http://127.0.0.1:8000/friendRequest`;

// Component to display a single friend request
function FriendRequest({ request }) {
  const { user_name, interests } = request;
  return (
    <div className="friend-request-container">
      <Link to={`/users/${user_name}`}>
        <h2>{user_name}</h2>
      </Link>
      <p>Interest: {interests}</p>
    </div>
  );
}

//propTypes for friend request component
FriendReqs.propTypes = {
  request: propTypes.shape({
    user_name: propTypes.string.isRequired,
    interests: propTypes.string,
  }).isRequired,
};

function FriendReqs({ setError, get, cancel, visible }) {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

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
      <h1>Friend Requests</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="request-list">
        {requests.map((request) => <FriendRequest key={request.user_name} request={request} />)}
      </div>
    </div>
  );
}

export default FriendReqs;