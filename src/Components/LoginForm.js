import React, { useState } from 'react';
import axios from 'axios';
import "./LoginSignupPage.css"


const success = function(){
  alert("logged in succesfully")
}

const LoginForm = ({ setLogin }) => {
  const [email, setEmail] = useState(''); // state for email input
  const [password, setPassword] = useState(''); // state for password input
  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission behavior
    console.log('Email:', email);
    console.log('Password:', password);
    if(!password) alert("please enter password")
    
    // make API call to backend server using axios
    axios.post('http://localhost:3000/login', {
      email:email,
      password:password
    })
    .then(response => {
      setData(response.data);
    
    })
    .catch(error => {
      console.log(error);
      
    });
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={success}>Login</button>
      <p>Don't have an account? <button onClick={() =>{ setLogin(false)}}>Signup</button></p>
    </form>
    {Object.keys(data).length > 0 && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
