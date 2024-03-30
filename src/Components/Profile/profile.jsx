import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

function Profile() {
    const [profile, setProfile] = useState({
        name: 'Robert',
        age: 21,
        interest: 'Travelling, Running',
        username: 'robertCS',
        imageUrl: 'https://ibb.co/SX39d9j'
    });

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-image">
                <img src={profile.imageUrl} alt={`${profile.name}'s profile`} />
            </div>
            <div className="profile-details">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Interests:</strong> {profile.interest}</p>
                <p><strong>Username:</strong> {profile.username}</p>
            </div>
        </div>
    );
}

export default Profile;
