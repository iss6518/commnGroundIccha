import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const LOGIN_ENDPOINT = `${BACKEND_URL}/login`;
console.log(LOGIN_ENDPOINT)

// how to pass in prop
const LogInForm = ({ setSessionData }) => {
  // initial state is empty for both name and password
  const [email, setEmail] = useState('');
  // TODO: need more secure way of setting password (ex: sha256)
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  // const [sessionData, setSessionData] = useState(null); // Define sessionData state

  // functions to handle user inputs for username & password (triggered on state change) 
  const changeEmail = (event) => { setEmail(event.target.value); };
  const changePassword = (event) => { setPassword(event.target.value); };

  const logIn = async (filter) => {
    try {
      console.log('filter: ', filter)
      const response = await axios.post(LOGIN_ENDPOINT, filter);
      console.log("success: ", response); // response object is the user session
      setSessionData(response.data); // set session data. TODO: remove password from session data
      // navigate("/profile", { state: { sessionData: response.data } })
      navigate("/profile")
    } catch (error) {
      setError("There was a problem adding the user.");
    }
  };


  // called when login button is pressed
  const handleLogIn = (event) => {
    event.preventDefault();
    logIn({email, password});
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