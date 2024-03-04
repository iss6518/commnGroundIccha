import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PAGES = [
    { label: 'Home', destination: '/' },
    { label: 'Users', destination: '/users' },
    { label: 'Friend Requests', destination: '/friendRequests'},
    {label: 'My Friends', destination: '/friends'},
    {label: 'Profile', destination: '/profile'}
];

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

function Navbar() {

    const mapper = (page) => (
        <li>
            <Link to={page.destination}>
                {page.label}
            </Link>
        </li>
    );

    return (
        <nav>
      <ul className="wrapper">
        {PAGES.map((page) => <NavLink key={page.destination} page={page} />)}
      </ul>
    </nav>
    );
}

export default Navbar;