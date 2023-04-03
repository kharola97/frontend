import React, { useState } from 'react';
import axios from 'axios';
import "./LoginSignupPage.css"



const Signup = ({ setLogin }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Phone:', phone);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
      axios.post('localhost:3000/register', {
        firstName,
        lastName,
        phone,
        email,
        password,
        confirmPassword,
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
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <button type="submit">Signup</button>
        <p>Already have an account? <button onClick={() => {setLogin(true)}}>Login</button></p>
        
  
      </form>
    );
  };
  
  export default Signup;
  