import axios from "axios";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

/*
TODO: 
* need success message & clear out form once user clicks create account 
* need to redirect to login page once user creates account
*/

function CreateAccountForm({ onSubmit }) {

  // initial state is empty for both name and password
  const [user_name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterest] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [genderOptions, setGenderOptions] = useState([]); // State for gender options
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    // Fetch gender options from backend
    const fetchGenderOptions = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/gender-options`);
        setGenderOptions(data.gender_options);
      } catch (error) {
        setError("Error fetching gender options.");
      }
    };

    fetchGenderOptions();
  }, []);

  // functions to handle user inputs for username & password (triggered on state change) 
  const changeName = (event) => { setName(event.target.value); };
  const changeAge = (event) => { setAge(event.target.value); };
  const changeGender = (event) => { setGender(event.target.value); };
  const changeInterest = (event) => { setInterest(event.target.value); };
  const changeEmail = (event) => { setEmail(event.target.value); };
  const changePassword = (event) => { setPassword(event.target.value); };

  
  const createAccount = async (data) => {
    try {
      const response = await axios.post(USERS_ENDPOINT, data);
      console.log("success: ", response.data);
    } catch (error) {
      setError("There was a problem adding the user.");
    }
  };

  // called when create account button is pressed
  const handleSubmit = (event) => {
    event.preventDefault();
    createAccount({user_name, age, gender, interests, email, password});
  };

  return (
      <div className="login-container">
        <h2>Member Registration</h2>

        <form>
        <div className="form-group">
          <label htmlFor="user_name">Username:</label>
          <input
            type="text"
            id="user_name"
            value={user_name}
            onChange={changeName}
            name="user_name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={changeEmail}
            name="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={changeAge}
            name="age"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender (optional):</label>
          <select
            id="gender"
            value={gender}
            onChange={changeGender}
            required
          >
            <option value=""  disabled>Select Gender</option>
            {genderOptions && genderOptions.length > 0 && genderOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interests">Interests:</label>
          <input
            type="text"
            id="interests"
            value={interests}
            onChange={changeInterest}
            name="interests"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={changePassword}
            name="password"
            required
          />
        </div>

        <button type="submit" onClick={handleSubmit}>Create Account</button>
        <div className="links">
          <a href="/login">Log In</a> {/* Adjust the link as needed */}
        </div>
      </form>
    </div>
  );
}

export default CreateAccountForm;