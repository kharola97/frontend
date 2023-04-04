import React, { useState } from 'react';
import axios from 'axios';
import "./LoginSignupPage.css"
import {isValidateEmail,passwordVal,isValidName,isValidNo} from "../Validations/Validations"

const Signup = ({ setLogin }) => {
  
  const [data, setData] = useState({
    firstName : "",
    lastName : "",
    phone :"",
    email : "",
    password :"",
    confirmPassword:""
  });
  const [error, setError] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, email, password, confirmPassword } = data
    console.log(data)
       if(!firstName){
        setError('Please enter your firstName');
       }
       else if(!isValidName(firstName)){
        setError('Please enter your firstName');
       }
       else if(!lastName){
        setError('Please enter your firstName');
       }
       else if(!isValidName(lastName)){
        setError('Please enter your firstName');
       }
    else if (!email) {
      setError('Please enter your email');
    } 
    else if (!password) {
      setError('Please enter your password');
    } else if (!phone) {
      setError('Please enter your phone');
      
    } else if (!isValidNo(phone)) {
      setError('Please enter your phone');
    } 
    else if (!isValidateEmail(email)) {
      setError('Enter a valid email');
    } else if (!passwordVal(password)) {
      setError('Enter a valid password');
    } 
    else if(password !=confirmPassword){
      setError('password dont match');
    }else {
      try {
        let result = await axios.post('http://localhost:4500/register', {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        });
        console.log(result);
        alert('Signup successful');
      } catch (error) {
        // console.log(error);
        setError('Error registering user. Please try again later. again bro');
      }
    }
  };
  function handle(e){
    const newData = {...data}
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" id="firstName" value={data.firstName} onChange={(e) => handle(e)} />
        </label>
        <label>
          Last Name:
          <input type="text" id="lastName" value={data.lastName} onChange={(e) => handle(e)} />
        </label>
        <label>
          Phone:
          <input type="tel" id="phone"value={data.phone} onChange={(e) => handle(e)} />
        </label>
        <label>
          Email:
          <input type="email" id="email" value={data.email} onChange={(e) => handle(e)} />
        </label>
        <label>
          Password:
          <input type="password" id="password" value={data.password} onChange={(e) => handle(e)} />
        </label>
        <label>
          Confirm Password:
          <input type="password" id="confirmPassword" value={data.confirmPassword} onChange={(e) => handle(e)} />
        </label>
        <button type="submit" >Signup</button>
        <p>Already have an account? <button onClick={() => {setLogin(true)}}>Login</button></p>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signup;
