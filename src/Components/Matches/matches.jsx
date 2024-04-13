import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

const USERS_ENDPOINT = `${BACKEND_URL}/users`;

function Matches() { //fetching from backend
  const [error, setError] = useState('');
  const [matches, setMatches] = useState([]); // need this?

  const fetchMatches = () => {
    axios.get(USERS_ENDPOINT)
    .then((response) => {
      const matchesObj = response.data.Data;
      const keys = Object.keys(matchesObj);
      const matchesArr = keys.map((key) => matchesObj[key]);
      setMatches(matchesArr);
      console.log(response);
    }) // something good
    .catch(() => { setError('Something went wrong!'); }); //something bad
  };

  useEffect(
    fetchMatches,
    [],
    // if THIS isempty meaning it'll only
    // be called on initial render of app
  );

  return (
  <div className="wrapper">
    <h1>
    All my matches (or 'friends')
    </h1>
    {error && (
      <div className="error-message">
      {error}
      </div>
    )}
   
    {matches.map((match) => (
      <div className="match-container">
        <h2>{match.user_name}</h2>
      </div>
    ))}
  </div>
  );
}

export default Matches;