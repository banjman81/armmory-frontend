import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { Home } from './components/home/Home'
import Nav from "./components/nav/Nav"

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
