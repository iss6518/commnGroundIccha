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
import Games from './Components/Games';
import Profile from './Components/Profile';
import Users from './Components/Users';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path ="" element={<h1>Home</h1>} />
      <Route path="games" element={<Games />} />

      <Route path ="friendRequests" element={<h1>Friends Requests</h1>} />
      <Route path ="friends" element={<h1>My Friends</h1>} />
      <Route path ="profile" element={<Profile/>} />
      <Route path ="users"  element = {<h1>List of users...</h1>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
