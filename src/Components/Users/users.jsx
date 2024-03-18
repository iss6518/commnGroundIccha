import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom';


const USERS_ENDPOINT = `http://127.0.0.1:8000/users`;
const FRIENDS_ENDPOINT = `http://127.0.0.1:8000/matches`; // would be friends pg

// NOTES:
// GET fetchUsers does work
// POST findUsers (in UserSearchForm) does not work yet * (but wouldn't this be PUT???)
// POST? addFriend is what i'm curr working on (IS 03/07/24) **
// ------

// This doesn't work yet, attempt here (DA)
function UserSearchForm({ setError, fetchUsers, cancel, visible }) {
  const [name, setName] = useState('')

  const changeName = (event) => { setName(event.target.value); };

  const findUsers = (event) => {
    event.preventDefault();
    //axios.get(url, { params: { name: name } })
    axios.get(USERS_ENDPOINT, { params: {name: name} })
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

// Lines 55-83 work!
function User({user, addFriend}) {
  const {user_name, interests} = user;
  return (
    <div className="user-container">
      <Link to={user_name}>
          <h2>{user_name}</h2>
      </Link>
      <button type="submit" onClick={addFriend} className="addFriendBtn"> Add Friend </button>
      <p>
        Skill: ...          
        <br></br>
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

// ** Should I have addUsers in this func? Or which one? **
// don't want/need to make a separate component like UserAddForm
function Users() {
  const [users, setUsers] = useState([]);
  const [friend, addAFriend] = useState([]);
  const [error, setError] = useState('');
  const [findingUser, setfindingUser] = useState(false);
  const [friendToAdd, setfriendToAdd] = useState(false);

  // Iccha Adding 03/07/24 ***
  // NEW FUNC: add a friend (match)
  // need current user (^ user_name)
  // need user clicked (o/ user_name)
  // then use add user endpoint
  const addFriend = () => {
    axios.get(FRIENDS_ENDPOINT)
    .then(({data})=> {
      if(friendToAdd) { // TODO: friendToAdd has to be one clicked (how to capture that value ***)
        const filteredByName = users.filter(user => {
          return user.user_name.toLowerCase().includes(friendToAdd.toLowerCase());
        })
        addAFriend(usersObjectToArray(filteredByName)) 
        // TODO: would have to be filteredByName (other) and current logged in user 
        // (add mock for now, Dareck add?)
      }
    })
    // keep the error here
    .catch(() => { setError('Something went wrong'); }); //something bad
  };

  const fetchUsers = () => {
    axios.get(USERS_ENDPOINT)
    .then(({data})=> {
      setUsers(usersObjectToArray(data))
      // if using form (findingUser)
      if(findingUser) {
        console.log("USING FORM") // this works once press 'SEARCH'
        const filteredByName = users.filter(user => {
          return user.user_name.toLowerCase().includes(findingUser.toLowerCase());
        })
        // current user is UNDEFINED
        // needs to be of searched user
        // then return is fine...
        // QUESTION: How to get the ?name param and 
        // then use it to showcase the option (same, toLowerCase)
        // and fine if duplicate on screen for now...
        setUsers(usersObjectToArray(filteredByName))
        console.log("SET USERS TEST")
      }

      console.log("NOT USING FORM")
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