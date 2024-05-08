import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PAGES = [ // normal user
    { label: 'Home', destination: '/' },
    { label: 'Users', destination: '/users' },
    { label: 'Friend Requests', destination: '/friendRequests'},
    {label: 'My Friends', destination: '/friends'},
    {label: 'Profile', destination: '/profile'}
];

const NOTLOGGEDIN = [ // not logged in
  { label: 'Home', destination: '/' },
];

const DEVELOPER = [ // developer user
  { label: 'Home', destination: '/' },
  { label: 'Users', destination: '/users' },
  { label: 'Friend Requests', destination: '/friendRequests'},
  {label: 'My Friends', destination: '/friends'},
  {label: 'Profile', destination: '/profile'},
  {label: 'Developer', destination: '/developer'}
]

function NavLink({ page }) {
    const { label, destination } = page;
    return (
      <li>
        <Link to={destination}>{label}</Link>
      </li>
    );
  }
  NavLink.propTypes = {
    page: propTypes.shape({
      label: propTypes.string.isRequired,
      destination: propTypes.string.isRequired,
    }).isRequired,
  };

const Navbar = ({ sessionData }) => {
  // if a user is not logged in their navbar will only have the home page
  if (!sessionData) {
    return (
    <nav>
    <ul className="wrapper">
      {NOTLOGGEDIN.map((page) => <NavLink key={page.destination} page={page} />)}
    </ul>
  </nav>
  );
  }

  // if user logged in is a developer they will have a developer page they have access to
  else if (sessionData.session.role == 'developer') {
    return (
      <nav>
      <ul className="wrapper">
        {DEVELOPER.map((page) => <NavLink key={page.destination} page={page} />)}
      </ul>
    </nav>
    );
  }
  
  // for normal users that are logged in
  else {
    return (
      <nav>
        <ul className="wrapper">
          {PAGES.map((page) => <NavLink key={page.destination} page={page} />)}
        </ul>
      </nav>
    );
  }

}

export default Navbar;