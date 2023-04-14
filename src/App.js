import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import React, { useState, useEffect } from 'react';
import {  BrowserRouter as Router, Routes,Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AboutUs from './Components/AboutUs';
import "../src/Components/SignUp.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddNewRecipe from './Components/AddNewRecipe';
import Profile from './Components/Profile';
import ViewRecipe from "./Components/ViewRecipe"
import MyRecipe from './Components/MyRecipe';
import EditRecipe from './Components/EditRecipe';
import RecipeComments from './Components/RecipeComments';

function RedirectToLogin({ loggedIn, children }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn) {
      navigate('/Login')
    }
  }, [loggedIn, navigate])

  return children
}
function App() {
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <Router>
      <div>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <ToastContainer />

        <Routes>
        <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/" element={<RedirectToLogin loggedIn={loggedIn}><Home/></RedirectToLogin>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Abouttus" element={<AboutUs/>} />
        <Route path="/AddNewRecipe" element={<RedirectToLogin loggedIn={loggedIn}><AddNewRecipe/></RedirectToLogin>} />
        <Route path="/Profile" element={<RedirectToLogin loggedIn={loggedIn}><Profile/></RedirectToLogin> } />
        <Route path="/ViewRecipe" element={<RedirectToLogin loggedIn={loggedIn}><ViewRecipe/></RedirectToLogin>} />
        <Route path="/MyRecipe" element={<RedirectToLogin loggedIn={loggedIn}><MyRecipe/></RedirectToLogin>} />
        <Route path="/EditRecipe/:recipeId" element={<EditRecipe />} />
        <Route path="/RecipeComments/:recipeId" element={<RecipeComments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
