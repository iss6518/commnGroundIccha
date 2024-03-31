import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
// import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `http://127.0.0.1:8000/users`;
// const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function CreateAccountForm({ setError, fetchUser, cancel, visible }) {
  // initial state is empty for both name and password
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [interest, setInterest] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // functions to handle user inputs for username & password (triggered on state change) 
  const changeName = (event) => { setName(event.target.value); };
  const changeAge = (event) => { setAge(event.target.value); };
  const changeGender = (event) => { setGender(event.target.value); };
  const changeInterest = (event) => { setInterest(event.target.value); };
  const changeEmail = (event) => { setEmail(event.target.value); };
  const changePassword = (event) => { setPassword(event.target.value); };

  // function to handle submit ("log in") button
  const createaccount = (event) => {
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
  /**"age": 21,
            "gender": "male",
            "interests": "cs" */
  return(
    <div className="login-container">
        <h2>Member Registration</h2>
        <form>
          <div className="input-group">
            <label htmlFor="name">Username</label>
            <input type="text" id="name" value={name} onChange={changeName}/>
          </div>
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" value={age} onChange={changeAge}/>
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <input type="text" id="gender" value={gender} onChange={changeGender}/>
          </div>
          <div className="input-group">
            <label htmlFor="interest">Your Interest</label>
            <input type="text" id="interest" value={interest} onChange={changeInterest}/>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={email} onChange={changeEmail}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={changePassword}/>
          </div>
          <div className="actions">
            <button type="submit" onClick={createaccount}>Create Account</button>
            <div className="links">
              <a href="login">Log In</a>
            </div>
          </div>
        </form>
      </div>
  );
}

// for adding cancel/visible
// **** TODO need to figure this out
CreateAccountForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchUser: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function CreateAccount() { //fetching from backend
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
      Create Account
    </h1>
    {error && (
      <div className="error-message">
      {error}
      </div>
    )}
    <CreateAccountForm 
    setError={setError}
    fetchUser={fetchUser}
    // cancel={hideAddGameForm}
    />
  </div>
  );
}

export default CreateAccount;