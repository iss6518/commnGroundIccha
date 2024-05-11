import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

// const USERS_ENDPOINT = `${BACKEND_URL}/users`;
const MATCHES_ENDPOINT = `${BACKEND_URL}/matches`

function EachFriend({ request, onDelete, onMessage }) {
  const { user_name, interests } = request;
  const [isDeleting, setDeleting] = useState(false);
  const [isMessaging, setMessaging] = useState(false);

  // ability to delete a friend request
  const handleDelete = async () => {
    /*
    try {
      setDeleting(true);

      // calling endpoint to delete the friend request
      // filter = {user_name: ..., other_user: ...}
      await axios.delete(FRIEND_REQUESTS_ENDPOINT, filter);
      onDelete(user_name);

    } catch (error) {
      console.error('Error deleting this friend request...', error);

    } finally {
      setDeleting(false);
    } */
    console.log("delete friend is a work in progress")
  };

  // ability to accept a friend request
  const handleMessage = async () => {
    /*
    try {
      setAccepting(true);

      // calling endpoint to accept the friend request
      // filter = {user_name: ..., other_user: ...}
      await axios.post(MATCH_ENDPOINT, filter);
      onAccept(user_name);

    } catch (error) {
      console.error('Error accepting this friend request...', error);

    } finally {
      setAccepting(false);
    } */
    console.log("Messaging a friend is a work in progress")
  };

  return (
    <div className="friend-request-container">
      <Link to={user_name}>
        <h2>{user_name}</h2>
      </Link>
      <button className='msgFriend' onClick = {handleMessage} disabled={isMessaging}> 
        {isMessaging ? 'Messaging now...' : 'Message'}
      </button>
      <button className='removeFriendBtn' onClick = {handleDelete} disabled={isDeleting}> 
        {isDeleting ? 'Deleting now...' : 'Delete Request'}
      </button>
    </div>
  );
}
//propTypes for friend request component
EachFriend.propTypes = {
  request: propTypes.shape({
    user_name: propTypes.string,
    interests: propTypes.string,
  }),
  onDelete: propTypes.func,
  onMessage: propTypes.func,
};


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
      axios.get(MATCHES_ENDPOINT)
      .then(({ data }) => {
        // Filter the data by user_name
        // console.log("data: ", data)
        const filteredFriends = Object.values(data.Data).filter(item => item.user_name == currUser);
        console.log("FilterObj", filteredFriends)
        
        // Convert the filtered requests object into an array
        if (filteredFriends) {
          const filteredFriendsArray = filteredFriends[0].match_list
          console.log("FilterArray", filteredFriendsArray)
          // Update the state with the filtered requests
          setFriends(filteredFriendsArray);
        }
        else {setFriends([]);}
        })
        .catch(() => setError('Something went wrong fetching friend requests.'));
    }
    else {navigate("/login")}
  };

  useEffect(
    fetchFriends,
    [],
    // if THIS isempty meaning it'll only
    // be called on initial render of app
  );

  if(friends.length == 0) {
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
      <h2>YOU HAVE NO ADDED FRIENDS YET</h2>
    </div>
    )
  }

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
    <div className="request-list">
        {friends.map((username) => (
          <EachFriend key={username} request={{ user_name: username }} />
        ))}
    </div>
  </div>
  );
}

export default Friends;