import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

//import { useNavigate, Link } from 'react-router-dom';
//import {useDispatch} from 'react-redux'

const USERS_ENDPOINT = `${BACKEND_URL}/users`;
console.log(USERS_ENDPOINT)

function LogInForm() {
  // initial state is empty for both name and password
  const [user_name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // functions to handle user inputs for username & password (triggered on state change) 
  const changeName = (event) => { setName(event.target.value); };
  const changePassword = (event) => { setPassword(event.target.value); };

  /*
  // function to handle submit ("log in") button
  const logIn = (event) => {
    event.preventDefault(); // default when submitting form is to reload page & we don't want that
    axios.get(USERS_ENDPOINT, { user_name: name, password: password })
    .then(() => {
      setError('');
      fetchUser();
    })
    .catch((error) => {
      setError(error.response.data.message);
    });
  };
  */

  const logIn = async (filter) => {
    try {
      console.log('filter: ', filter)
      const response = await axios.get(USERS_ENDPOINT, filter);
      console.log("success: ", response);
    } catch (error) {
      setError("There was a problem adding the user.");
    }
  };


  // called when create account button is pressed
  const handleLogIn = (event) => {
    event.preventDefault();
    logIn({user_name, password});
    // need to set session to this user here
  };

  return(
    <div className="login-container">
        <h2>Member Login</h2>
        <form>
          <div className="input-group">
            <label htmlFor="name">Username</label>
            <input type="text" id="user_name" value={user_name} onChange={changeName}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={changePassword}/>
          </div>
          <div className="actions">
            <button type="submit" onClick={handleLogIn}>Login</button>
            <div className="links">
              <a href="createAccount">New User?</a>
            </div>
            <div className="links">
            </div>
          </div>
        </form>
      </div>
  );
}

/*
function Login() { //fetching from backend
  const [error, setError] = useState('');

  const fetchUser = () => {
    axios.get(USERS_ENDPOINT)
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          console.log('This is response data')
          console.log(response.data);
          // return response.data;
    }) // something good
    .catch(() => { setError('Something went wrong'); }); //something bad
  };

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
  </div>
  );
}
*/

export default LogInForm;