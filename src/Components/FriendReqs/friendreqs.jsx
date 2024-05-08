import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';

const FRIEND_REQUESTS_ENDPOINT = `${BACKEND_URL}/friendRequest`;
// const MATCH_ENDPOINT = `${BACKEND_URL}/matches`; to be used for when accepting FR


// Component to display a single friend request

// Accept & Delete FR functionality is a work in progress 
// but ground work has been done here in comments
function FriendRequest({ request, onDelete, onAccept }) {
  const { user_name, interests } = request;
  const [isDeleting, setDeleting] = useState(false);
  const [isAccepting, setAccepting] = useState(false);

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
    console.log("delete friend request is a work in progress")
  };

  // ability to accept a friend request
  const handleAccept = async () => {
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
    console.log("accept friend request is a work in progress")
  };

  return (
    <div className="friend-request-container">
      <Link to={user_name}>
        <h2>{user_name}</h2>
      </Link>
      <button className='accept-button' onClick = {handleAccept} disabled={isAccepting}> 
        {isAccepting ? 'Accepting now...' : 'Accept Request'}
      </button>
      <button className='delete-button' onClick = {handleDelete} disabled={isDeleting}> 
        {isDeleting ? 'Deleting now...' : 'Delete Request'}
      </button>
    </div>
  );
}
//propTypes for friend request component
FriendRequest.propTypes = {
  request: propTypes.shape({
    user_name: propTypes.string,
    interests: propTypes.string,
  }),
  onDelete: propTypes.func,
  onAccept: propTypes.func,
};


// Function to convert object of requests to an array
function requestsObjectToArray({ Data }) {
  const keys = Object.keys(Data)
  const users = keys.map((key)=>Data[key])
  return users
}

// Main component to display all friend requests
const FriendReqs = ({ sessionData }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  // if user is not logged in navigate them to login!
  const navigate = useNavigate();
  if (!sessionData) {navigate("/login")}

  const fetchFriendRequests = () => {
    // get logged in user
    const currUser = sessionData.session.user_name
    // only display FRR list for this user
    axios.get(FRIEND_REQUESTS_ENDPOINT + '/' + currUser)
    // axios.get(FRIEND_REQUESTS_ENDPOINT)
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