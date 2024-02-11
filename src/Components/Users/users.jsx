import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

function Users() { //fetching from backend 
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    
  
    const fetchUsers = () => {
      axios.get('http://localhost:8000/users')
      .then((response) => {
        const usersObject = response.data.Data;
        const keys = Object.keys(usersObject);
        const usersArray = keys.map((key) => usersObject[key]);
        setUsers(usersArray);
        console.log(response);
      }) 
      .catch(() => { setError('Something went wrong'); }); //something bad
    };
  
    useEffect(
      fetchUsers,
      [],
      // if THIS isempty meaning it'll only be called on initial render of app
    );

    return (
    <div className="wrapper">
      <h1>
        Displaying all users...
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
      
      <AddUserForm 
      setError={setError}
      fetchUsers={fetchUsers}
      // cancel={hideAddGameForm}
      />
      {users.map((user) => (
        <div className="user-container">
          <h2>{user.}</h2>
        </div>
      ))}
    </div>
    
    );
  }
  
  export default Users;