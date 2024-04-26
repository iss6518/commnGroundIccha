import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';

// HOW TO CREATE A JSX COMPONENT:
// function LoremIpsum() {
//   return (
//     <>
//       Lorem ipsum dolor sit amet
//     </>
//   );
// }

import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Friends from './Components/Friends';
import FriendReqs from './Components/FriendReqs';
import Users from './Components/Users';
import Login from './Components/LogIn';
import CreateAccountForm from './Components/createAccount';
import FormBuilder from './forms/formBuilder'; 

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={
          <>

            <div className="welcome-message">
            <center><h1>Welcome to <span className="highlight">CommonGround!</span></h1></center>
            </div>


            <div className="homepage-container">
            <div className="content-section">
            <h2 className="headline">  <span className="highlight">CommonGround</span> is a platform that connects people with shared interests and goals!</h2>
            
            <p className="subtext">
                  Its versatility acts as a mentorship, hobby sharing, or partner matching tool
                </p>

              </div>
            </div>

            <div className="image-container">
            <img src="https://media.istockphoto.com/id/1383122126/vector/vector-illustration-of-an-abstract-scheme-which-contains-people-icons.jpg?s=612x612&w=0&k=20&c=dELp5546VC94zdiX8i2M1xzs2TNCE_3MKppbFZhduBs=" alt="Connect with others today!" />
            </div>
          </>
            

        } />

      <Route path="login" element={<Login />} />
      <Route path="createaccount" element={<CreateAccountForm />} />
      <Route path="form-builder" element={<FormBuilder />} /> 
      <Route path ="friendRequests" element={<FriendReqs/>} />
      <Route path ="friends" element={<Friends/>} />
      <Route path ="profile" element={<Profile/>} />
      <Route path ="users"  element = {<Users />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
