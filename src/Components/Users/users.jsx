import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = () => {
    axios.get('http://127.0.0.1/:8000/users')
      .then(response => {
      
        const usersObject = response.data.Data;
        const keys = Object.keys(usersObject);
        const usersArray = keys.map((key) => usersObject[key]);
        setUsers(usersArray);
        console.log(response);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []); 

  return (
    <div className="wrapper">
      <h1>Displaying all users...</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="user-list">
        {users.map((user, index) => (
          <div key={index} className="user-container">
      
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
