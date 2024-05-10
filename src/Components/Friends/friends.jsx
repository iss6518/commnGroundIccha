import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

const Friends = ({ sessionData }) => {
  const [error, setError] = useState('');
  const [friends, setFriends] = useState([]);

  // if user is not logged in navigate them to login!
  const navigate = useNavigate();
  if (!sessionData) {navigate("/login")}

  const fetchFriends = () => {
    // if logged in
    if (sessionData) {
      // get logged in user
      const currUser = sessionData.session.user_name
      const filter = {'user_name': currUser}
      console.log(filter)

      // only display MATCHES list for this user
      // TODO: need BE endpoint to filter by user name so we can get this list
      axios.get(USERS_ENDPOINT, filter)
      .then((response) => {
        const friendsObj = response.data.Data;
        const keys = Object.keys(friendsObj);
        const friendArr = keys.map((key) => friendsObj[key]);
        setFriends(friendArr);
        console.log(response);
      }) // something good
      .catch(() => { setError('Something went wrong!'); }); //something bad
    }
    else {navigate("/login")}
  };

  useEffect(
    fetchFriends,
    [],
    // if THIS isempty meaning it'll only
    // be called on initial render of app
  );

  // TODO: Message Friend & Remove Friend buttons are a work in progress
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
        <button className="msgFriend"> Message Friend </button>
        <button className="removeFriendBtn"> Remove Friend </button>
      </div>
    ))}
  </div>
  );
}

export default Friends;