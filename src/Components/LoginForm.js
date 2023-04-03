import React, { useState } from 'react';
import axios from 'axios';
import "./LoginSignupPage.css"

const LoginForm = ({ setLogin }) => {
  const [email, setEmail] = useState(''); // state for email input
  const [password, setPassword] = useState(''); // state for password input

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission behavior
    console.log('Email:', email);
    console.log('Password:', password);
    
    // make API call to backend server using axios
    axios.post('localhost:3000/login', {
      email,
      password
    })
    .then(response => {
      console.log(response);
      // TODO: handle successful response from backend server
    })
    .catch(error => {
      console.log(error);
      // TODO: handle error response from backend server
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
      <p>Don't have an account? <button onClick={() =>{ setLogin(false)}}>Signup</button></p>
    </form>
  );
};

export default LoginForm;
