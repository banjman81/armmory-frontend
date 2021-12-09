import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Home } from './components/home/Home'
import SignUp from './components/signup/Signup'
import Nav from "./components/nav/Nav"
import Signin from './components/signin/signin';
import Logout from './components/signin/Logout';

import {UserContext} from './components/context/userContext'



function App() {

  const [user, setUser] = useState({})

  const userContextValues = {
    user,
    setUser
  }
  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={userContextValues}>
          <Nav />
          <ToastContainer
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
          />
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/logout" element={<Logout/>}></Route>
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
