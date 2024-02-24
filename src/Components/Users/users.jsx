import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom';


const USERS_ENDPOINT = `http://127.0.0.1:8000/users`;


function User({user}) {
  const {user_name, interests} = user; 
  return (
    <div className="game-container">
      <Link to={user_name}>
          <h2>{user_name}</h2>
      </Link>
      <p>
        Skill: ...
        Interest: {interests}
      </p>
    </div>
  );
}
User.propTypes = {
  user: propTypes.shape({
    user_name: propTypes.string.isRequired,
    interests: propTypes.string.isRequired,
  }).isRequired,
};


function usersObjectToArray({Data}) {
  const keys = Object.keys(Data)
  const users = keys.map((key)=>Data[key])
  return users
}


function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = () => {
    axios.get(USERS_ENDPOINT)
    .then(({data})=> setUsers(usersObjectToArray(data)))
    .catch(() => { setError('Something went wrong'); }); //something bad
  };

  useEffect(() => {
    fetchUsers();
  }, []); 

  return (
    <div className="wrapper">
      <h1>All users</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="user-list">
        {users.map((user) => <User key={user.name} user={user} />)}
      </div>
    </div>
  );
}

export default Users;