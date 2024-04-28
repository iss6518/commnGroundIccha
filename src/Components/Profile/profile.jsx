import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const sessionData = location.state?.sessionData.session;
    if (!sessionData) {return <div>Loading...</div>;}
// function Profile() {
    const profile = {
        name: sessionData.user_name,
        age: sessionData.age,
        interest: sessionData.interests,
        email: sessionData.email,
        imageUrl: 'https://stock.adobe.com/images/default-profile-picture/215844325'
    };

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
                <p><strong>Email:</strong> {profile.email}</p>
            </div>
        </div>
    );
}

export default Profile;
