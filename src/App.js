import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Friends from './Components/Friends';
import FriendReqs from './Components/FriendReqs';
import Users from './Components/Users';
import Login from './Components/LogIn';
import CreateAccountForm from './Components/createAccount';
import FormBuilder from './forms/formBuilder'; 

// Extracted Home component with useNavigate
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="welcome-message">
        <center><h1>Welcome to <span className="highlight">CommonGround!</span></h1></center>
      </div>
      <div className="homepage-container">
        <div className="content-section">
          <h2 className="headline"><span className="highlight">CommonGround</span> is a platform that connects people with shared interests and goals!</h2>
          <p className="subtext">
            Its versatility acts as a mentorship, hobby sharing, or partner matching tool
          </p>
          {/* Buttons for Login and Create Account */}
          <div className="button-container">
            <button onClick={() => navigate('/login')} className="link-button">Login</button>
            <button onClick={() => navigate('/createAccount')} className="link-button">Create Account</button>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img src="https://media.istockphoto.com/id/1383122126/vector/vector-illustration-of-an-abstract-scheme-which-contains-people-icons.jpg?s=612x612&w=0&k=20&c=dELp5546VC94zdiX8i2M1xzs2TNCE_3MKppbFZhduBs=" alt="Connect with others today!" />
      </div>
    </>
  );
}

function App() {
  const [sessionData, setSessionData] = useState(null);

  return (
    <BrowserRouter>
      <Navbar sessionData={sessionData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login setSessionData={setSessionData} />} />
        <Route path="createaccount" element={<CreateAccountForm />} />
        <Route path="form-builder" element={<FormBuilder />} />
        <Route path="friendRequests" element={<FriendReqs sessionData={sessionData} />} />
        <Route path="friends" element={<Friends sessionData={sessionData} />} />
        <Route path="profile" element={<Profile sessionData={sessionData} setSessionData={setSessionData}  />} />
        <Route path="users" element={<Users sessionData={sessionData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
