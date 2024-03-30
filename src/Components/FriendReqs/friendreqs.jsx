import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom';


const FRIEND_REQUESTS_ENDPOINT = `http://127.0.0.1:8000/friendRequest`;

// Component to display a single friend request
//We also add ability to delete a friend request
function FriendRequest({ request, onDelete }) {
  const { user_name, interests } = request;
  const [isDeleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      // calling endpoint to delete the friend request
      await axios.delete(FRIEND_REQUESTS_ENDPOINT + '/' + user_name);
      onDelete(user_name);

    } catch (error) {
      console.error('Error deleting this friend request...', error);

    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="friend-request-container">
      <Link to={user_name}>
        <h2>{user_name}</h2>
      </Link>
      <p>Interest: {interests}</p>
      <button className='delete-button' onClick = {handleDelete} disabled={isDeleting}> 
        {isDeleting ? 'Deleting now...' : 'Delete Request'}
      </button>
    </div>
  );
}

//propTypes for friend request component
FriendReqs.propTypes = {
  request: propTypes.shape({
    user_name: propTypes.string,
    interests: propTypes.string,
  }).isRequired,
  onDelete: propTypes.func.isRequired,
};

// Function to convert object of requests to an array
function requestsObjectToArray({ Data }) {
  const keys = Object.keys(Data)
  const users = keys.map((key)=>Data[key])
  return users
}

// Main component to display all friend requests
function FriendReqs() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  const fetchFriendRequests = () => {
    axios.get(FRIEND_REQUESTS_ENDPOINT)
      .then(({ data }) => setRequests(requestsObjectToArray(data)))
      .catch(() => setError('Something went wrong fetching friend requests.'));
  };

  useEffect(
    fetchFriendRequests,
    [],
    // if THIS is empty meaning it'll only
    // be called on initial render of app
  );
  return (
    <div className="wrapper">
      <h1>All Friend Requests</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="request-list">
        {requests.map((request) => <FriendRequest key={request.user_name} request={request} />)}
      </div>
    </div>
  );
}

export default FriendReqs;