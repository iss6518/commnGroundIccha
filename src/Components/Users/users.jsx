import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom';


const USERS_ENDPOINT = `http://127.0.0.1:8000/users`;


function UserSearchForm({ setError, fetchUsers, cancel, visible }) {
  const [name, setName] = useState('')

  const changeName = (event) => { setName(event.target.value); };

  const findUsers = (event) => {
    event.preventDefault();
    axios.get(USERS_ENDPOINT, {name: name})
    .then(()=> {
      setError('');
      fetchUsers();
    })
    .catch((error) => {
      setError(error.response.data.message);
    })
  }

  if (!visible) return null;
  return(
    <form>
        <label htmlFor="name"> 
          Search
        </label>
        <input required type="text" id="name" value={name} onChange={changeName}/>

        <button type="submit" onClick={findUsers}>Search</button>
        <button type="button" onClick={cancel}>Cancel</button>
    </form>
  );
}
UserSearchForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchUsers: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};



function User({user}) {
  const {user_name, interests} = user; 
  return (
    <div className="user-container">
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
  const [findingUser, setfindingUser] = useState(false);

  const fetchUsers = () => {
    axios.get(USERS_ENDPOINT)
    .then(({data})=> {
      setUsers(usersObjectToArray(data))
      if(findingUser) {
        const filteredByName = users.filter(user => {
          return user.user_name.toLowerCase().includes(findingUser.toLowerCase());
        })
        setUsers(usersObjectToArray(filteredByName))
      }
    })
    .catch(() => { setError('Something went wrong'); }); //something bad
  };

  // if user clicks on Add Game button toggle on and off visibility of add form
  const showAddUserForm = () => { setfindingUser(true); };
  const hideAddUserForm = () => { setfindingUser(false); };

  useEffect(() => {
    fetchUsers();
  }, []); 

  return (
    <div className="wrapper">
      <header>
        <h1>All users</h1>
        <button type="button" onClick={showAddUserForm}>
          Search!
        </button>
      </header>

      <UserSearchForm
        visible={findingUser}
        cancel={hideAddUserForm}
        fetchUsers={fetchUsers}
        setError={setError}
      />

      {error && <div className="error-message">{error}</div>}
      <div className="user-list">
        {users.map((user) => <User key={user.name} user={user} />)}
      </div>
    </div>
  );
}

export default Users;