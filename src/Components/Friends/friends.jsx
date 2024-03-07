import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

// const USERS_ENDPOINT = `${BACKEND_URL}/users`;
const USERS_ENDPOINT = "http://127.0.0.1:8000/matches"

function Friends() { //fetching from backend
  const [error, setError] = useState('');
  const [friends, setFriends] = useState([]); // need this?

  const fetchFriends = () => {
    axios.get(USERS_ENDPOINT)
    .then((response) => {
      const friendsObj = response.data.Data;
      const keys = Object.keys(friendsObj);
      const friendArr = keys.map((key) => friendsObj[key]);
      setFriends(friendArr);
      console.log(response);
    }) // something good
    .catch(() => { setError('Something went wrong!'); }); //something bad
  };

  useEffect(
    fetchFriends,
    [],
    // if THIS isempty meaning it'll only
    // be called on initial render of app
  );

  return (
  <div className="wrapper">
    <h1>
    Friends - all my matches
    </h1>
    {error && (
      <div className="error-message">
      {error}
      </div>
    )}
   
    {friends.map((friend) => (
      <div className="user-container">
        <h2>{friend.user_name}</h2>
        <button className="removeFriendBtn"> Remove Friend </button>
      </div>
    ))}
  </div>
  );
}

export default Friends;