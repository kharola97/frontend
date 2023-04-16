import './App.css';
import Navbar from './Components/AllComponents/Navbar';
import Home from './Components/AllComponents//Home';
import React, { useState, useEffect } from 'react';
import {  BrowserRouter as Router, Routes,Route, useNavigate } from 'react-router-dom';
import Login from './Components/AllComponents//Login';
import SignUp from './Components/AllComponents//SignUp';
import AboutUs from './Components/AllComponents//AboutUs';
import "../src/Components/AllCss/SignUp.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddNewRecipe from './Components/AllComponents//AddNewRecipe';
import Profile from './Components//AllComponents/Profile';
import ViewRecipe from "./Components/AllComponents//ViewRecipe"
import MyRecipe from './Components/AllComponents//MyRecipe';
import EditRecipe from './Components/AllComponents//EditRecipe';
import RecipeComments from './Components/AllComponents//RecipeComments';

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
