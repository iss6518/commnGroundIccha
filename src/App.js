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
import CreateAccount from './Components/createAccount';

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
            <h2 className="headline">CommonGround is a platform that connects people with shared interests and goals!</h2>
            
            <p className="subtext">
                  Its versatility acts as a mentorship, hobby sharing, or partner matching tool
                </p>

              </div>
            </div>


          </>
            

        } />

      <Route path="login" element={<Login />} />
      <Route path="createaccount" element={<CreateAccount />} />
      <Route path ="friendRequests" element={<FriendReqs/>} />
      <Route path ="friends" element={<Friends/>} />
      <Route path ="profile" element={<Profile/>} />
      <Route path ="users"  element = {<Users />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
