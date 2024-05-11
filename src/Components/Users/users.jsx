import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;
console.log("this is backend url: ", USERS_ENDPOINT)
const FRIENDREQ_ENDPOINT = `${BACKEND_URL}/friendRequest`;
// const USERS_ENDPOINT = `http://127.0.0.1:8000/users`;
// const FRIENDREQ_ENDPOINT = `http://127.0.0.1:8000/friendRequest`;


function UserSearchForm({ setError, fetchUsers, cancel, visible }) {
    const [name, setName] = useState('');
  
    const changeName = (event) => {setName(event.target.value);};
  
    const findUsers = (event) => {
      event.preventDefault();
      fetchUsers(name);
    };
  
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
  

function User({ user, addFriend }) {
  const { user_name, interests } = user;

  const handleAddFriend = () => {
    addFriend(user); // Pass the user to the addFriend function
  };

  return (
    <div className="user-container">
      <Link to={user_name}>
        <h2>{user_name}</h2>
      </Link>
      <button type="button" onClick={handleAddFriend} className="addFriendBtn">
        Add Friend
      </button>
      <p>
        Skill: ...
        <br />
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
  addFriend: propTypes.func.isRequired, // Add addFriend prop validation
};

function usersObjectToArray({Data}) {
    const keys = Object.keys(Data)
    const users = keys.map((key)=>Data[key])
    return users
}


function Users({ sessionData }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');

  // TODO: flash message saying user must be logged in to access this page
  // or remove from nav list if user is not logged in
  const navigate = useNavigate();
  if (!sessionData) {
    console.log("yooooooooooo")
    navigate("/login")}

  
  const handleSearch = (name) => {
    setSearchName(name);
    // console.log(searchName)
    fetchUsers(name);
  };
  
  const fetchUsers = (name = '') => {
    // `${USERS_ENDPOINT}?name=${name}`
    axios.get(USERS_ENDPOINT)
      .then(({ data }) => {
        setUsers(usersObjectToArray(data));
        console.log(searchName)
      })
      .catch(() => {
        setError('Something went wrong');
      });
  };

  const addFriend = (userToAdd) => {
    if (sessionData) {
      // get logged in user
      const user_name = sessionData.session.user_name
      const other_user = userToAdd.user_name;

      console.log(user_name)
      console.log(other_user)

      axios.post(FRIENDREQ_ENDPOINT, { user_name, other_user })
        .then(() => {
          console.log('Friend added successfully');
        })
        .catch((error) => {
          setError('Something went wrong');
          console.error('Error adding friend:', error);
        });
    } else {navigate("/login")}
  };

  useEffect(() => {
    fetchUsers(searchName);
}, [searchName]);

  return (
    <div className="wrapper">
      <header>
        <h1>All users</h1>
      </header>

      <UserSearchForm visible fetchUsers={handleSearch} setError={setError} />

      {error && <div className="error-message">{error}</div>}

      <div className="user-list">
        {users.map((user) => (
          <User key={user.user_name} user={user} addFriend={addFriend} />
        ))}
      </div>
    </div>
  );
}

export default Users;