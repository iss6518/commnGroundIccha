import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = () => {
    axios.get('http://127.0.0.1/:8000/users')
      .then(response => {
        // Log the response data to the console for debugging
        console.log('Response data:', response.data);

        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          // If the data is not an array, log an error and set an error message
          console.error('Data is not an array', response.data);
          setError('Data format is incorrect, expected an array');
        }
      })
      .catch((error) => {
        // Log the error to the console and display a user-friendly message
        console.error('Fetching users failed:', error);
        setError('Something went wrong while fetching users');
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div className="wrapper">
      <h1>Displaying all users...</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="user-list">
        {users.map((user, index) => (
          <div key={index} className="user-container">
            {/* Ensure that 'name' and 'detail' are actual properties of the user objects */}
            <h2>{user.name}</h2> {/* Replace 'name' with the actual property name from your user object */}
            <p>{user.detail}</p> {/* Replace 'detail' with the actual property you want to display from the user object */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
