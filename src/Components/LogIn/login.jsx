import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
// import { BACKEND_URL } from '../../constants';

//import { useNavigate, Link } from 'react-router-dom';
//import {useDispatch} from 'react-redux'

const USERS_ENDPOINT = `http://127.0.0.1:8000/users`;
// const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function LogInForm({ setError, fetchUser, cancel, visible }) {
  // initial state is empty for both name and password
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // functions to handle user inputs for username & password (triggered on state change) 
  const changeName = (event) => { setName(event.target.value); };
  const changePassword = (event) => { setPassword(event.target.value); };

  // function to handle submit ("log in") button
  const logIn = (event) => {
    event.preventDefault(); // default when submitting form is to reload page & we don't want that

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
    <div className="login-container">
        <h2>Member Login</h2>
        <form>
          <div className="input-group">
            <label htmlFor="name">Username</label>
            <input type="text" id="name" value={name} onChange={changeName}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={changePassword}/>
          </div>
          <div className="actions">
            <button type="submit" onClick={logIn}>Login</button>
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

export default Login;