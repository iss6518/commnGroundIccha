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

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path ="" element={<h1>Home</h1>} />
      <Route path="games" element={<Games />} />
      <Route path ="users" element={<h1>Users</h1>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
