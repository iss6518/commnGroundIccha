import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

//import { useNavigate, Link } from 'react-router-dom';
//import {useDispatch} from 'react-redux'

const LOGIN_ENDPOINT = `${BACKEND_URL}/login`;
console.log(LOGIN_ENDPOINT)

function LogInForm() {
  // initial state is empty for both name and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // functions to handle user inputs for username & password (triggered on state change) 
  const changeEmail = (event) => { setEmail(event.target.value); };
  const changePassword = (event) => { setPassword(event.target.value); };

  const logIn = async (filter) => {
    try {
      console.log('filter: ', filter)
      const response = await axios.post(LOGIN_ENDPOINT, filter);
      console.log("success: ", response); // response object is the user session
    } catch (error) {
      setError("There was a problem adding the user.");
    }
  };


  // called when login button is pressed
  const handleLogIn = (event) => {
    event.preventDefault();
    logIn({email, password});
    // need to set session to this user here
    // need to have a developer account and regular user account
  };

  return(
    <div className="login-container">
        <h2>Member Login</h2>
        <form>
          <div className="input-group">
            <label htmlFor="name">Email</label>
            <input type="text" id="email" value={email} onChange={changeEmail}/>
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

export default LogInForm;