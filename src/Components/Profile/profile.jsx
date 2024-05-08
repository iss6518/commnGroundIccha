import { useNavigate } from 'react-router-dom';

const Profile = ({ sessionData, setSessionData }) => {
// const Profile = () => {
    //const location = useLocation(); // get current location of a React component (state info)
    //const sessionData = location.state?.sessionData.session;
    const navigate = useNavigate();

    if (!sessionData) {
        console.log("no data :) ")
        navigate("/login")} // hmmm

    else {
    console.log("IN PROFILE: ", sessionData)

    const profile = {
        name: sessionData.session.user_name,
        age: sessionData.session.age,
        interest: sessionData.session.interests,
        email: sessionData.session.email,
        role: sessionData.session.role,
        imageUrl: 'https://stock.adobe.com/images/default-profile-picture/215844325'
    };

    const handleLogout = () => {
        setSessionData(null);
        navigate('/login')
    }

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
                <p><strong>Role:</strong> {profile.role}</p>
            </div>
            <button className='logout-button' onClick = {handleLogout}> 
                LogOut
            </button>
        </div>
    );
    }
}

export default Profile;
