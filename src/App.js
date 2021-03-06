import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/home/Home';
import SignUp from './components/signup/Signup'
import Nav from "./components/nav/Nav"
import Signin from './components/signin/signin';
import Logout from './components/signin/Logout';
import AxiosBackend from './components/lib/axiosBackend';

import {UserContext} from './components/context/userContext'
import Footer from './components/footer/Footer';
import Profile from './components/profile/Profile';
import Game from './components/game/Game';
import { Games } from './components/game/Games';
import News from './components/news/News';

import PrivateRoute from './components/privateRoute/PrivateRoute';

console.disableYellowBox = true;
function App() {
  
  const [user, setUser] = useState({})
  const [favorites, setFavorites] = useState([])

  const key = process.env.REACT_APP_JWT_USER_SECRET

  useEffect(() => {
    try{
      let jwtToken = localStorage.getItem("loginToken")
      if(jwtToken){
        let decodedToken = jwt.verify(jwtToken, key)
        if(decodedToken.exp < Date.now()/1000){
          setUser({})
        }else{
          async function getUser(){
            let payload = await AxiosBackend.get(`/api/users/getUserByEmail/${decodedToken.email}`)
            setUser(payload.data)
          }
          getUser()
        }
          
      }
    }catch(e){
      localStorage.removeItem("loginToken")
      setUser({})
    }
    }, [])

  const userContextValues = {
    user,
    setUser,
    favorites,
    setFavorites
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
            <Route path="/games/:page" element={<Games/>}></Route>
            <Route path="/logout" element={
              <PrivateRoute><Logout/></PrivateRoute>}></Route>
            <Route path="/profile" element={
              <PrivateRoute><Profile/></PrivateRoute>}></Route>
            <Route path="/game/:id" element={<Game/>}></Route>
            <Route path="/news" element={
              <PrivateRoute><News/></PrivateRoute>}></Route>
          </Routes>
        </UserContext.Provider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
