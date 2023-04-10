import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import React, { useState } from 'react';
import {  BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import ContactUs from './Components/ContactUs';
import "../src/Components/SignUp.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddNewRecipe from './Components/AddNewRecipe';
import Profile from './Components/Profile';
import ViewRecipe from "./Components/ViewRecipe"
// import RecipeComment from "./Components/RecipeComment"
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <div>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <ToastContainer />

        <Routes>
        <Route  path="/" element={<Home/>} />
        <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/AddNewRecipe" element={<AddNewRecipe/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/ViewRecipe" element={<ViewRecipe/>} />
        {/* <Route path="/RecipeComment" element={<RecipeComment/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
