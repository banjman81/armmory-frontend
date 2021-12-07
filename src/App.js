import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { Home } from './components/home/Home'
import SignUp from './components/signup/Signup'
import Nav from "./components/nav/Nav"

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
