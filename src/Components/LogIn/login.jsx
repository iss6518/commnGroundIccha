import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
// import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `http://127.0.0.1:8000/users`;
// const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function LogInForm({ setError, fetchUser, cancel, visible }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const changeName = (event) => { setName(event.target.value); };
  const changePassword = (event) => { setPassword(event.target.value); };

  const logIn = (event) => {
    event.preventDefault();
    axios.post(USERS_ENDPOINT, { name: name, password: password })
    .then(() => {
      setError('');
      fetchUser();
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
          Password
        </label>
        <input type="text" id="name" value={password} onChange={changePassword}/>
        <button type="submit" onClick={logIn}>LogIn</button>
        <button type="button" onClick={cancel}>Cancel</button>
    </form>
  );
}

// for adding cancel/visible
// **** TODO need to figure this out
LogInForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchUser: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function Login() { //fetching from backend
  const [error, setError] = useState('');
  const [games, setGames] = useState([]);
  // const [addingGame, setAddingGame] = useState(true);

  const fetchUser = () => {
    axios.get(USERS_ENDPOINT)
    .then((response) => {
      const gamesObject = response.data.Data;
      const keys = Object.keys(gamesObject);
      const gamesArray = keys.map((key) => gamesObject[key]);
      setGames(gamesArray);
      console.log(response);
    }) // something good
    .catch(() => { setError('Something went wrong'); }); //something bad
  };

  // const showAddGameForm = () => { setAddingGame(true); };
  // const hideAddGameForm = () => { setAddingGame(false); };

  useEffect(
    fetchUser,
    [],
    // if THIS isempty meaning it'll only
    // be called on initial render of app
  );

  return (
  <div className="wrapper">
    <h1>
      Log In
    </h1>
    {error && (
      <div className="error-message">
      {error}
      </div>
    )}
    <LogInForm 
    setError={setError}
    fetchUser={fetchUser}
    // cancel={hideAddGameForm}
    />
    {games.map((game) => (
      <div className="game-container">
        <h2>{game.user_name}</h2>
      </div>
    ))}
  </div>
  );
}

export default Login;