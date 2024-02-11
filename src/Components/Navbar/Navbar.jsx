import React from 'react';
import { Link } from 'react-router-dom';

const PAGES = [
    { label: 'Home', destination: '/' },
    { label: 'Games', destination: '/games' },
    { label: 'Users', destination: '/users' },
    { label: 'Friend Requests', destination: '/friendRequests'},
    {label: 'My Friends', destination: '/friends'},
    {label: 'Profile', destination: '/profile'}
];

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
            <ul>
                {PAGES.map(mapper)}
            </ul>
        </nav>
    );
}

export default Navbar;