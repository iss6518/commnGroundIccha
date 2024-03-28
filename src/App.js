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
import LoginBox from './Components/LoginBox.jsx';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={
          <>
          <div className="welcome-container"></div>
            <h1>Welcome to CommonGround!</h1>
            <LoginBox />
          </>
        } />

      <Route path="login" element={<Login />} />
      <Route path ="friendRequests" element={<FriendReqs/>} />
      <Route path ="friends" element={<Friends/>} />
      <Route path ="profile" element={<Profile/>} />
      <Route path ="users"  element = {<Users />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
