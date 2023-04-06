import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import {  BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import ContactUs from './Components/ContactUs';
import "../src/Components/SignUp.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <ToastContainer />

        <Routes>
        <Route  path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
