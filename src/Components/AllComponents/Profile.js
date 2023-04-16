import React, { useState, useEffect } from 'react';
import { getCookie } from '../../Cookie/Cookies';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../AllCss/Profile.css"
import {isValidateEmail,passwordVal,isValidName,isValidNo,} from "../../Validations/Validations"
import API_URL from '../../Config/Api-Url';

const errorToast = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const successToast = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

function Profile() {
  const [editing, setEditing] = useState(false);
  const [user,setUser] = useState({
    Fullname:"",number:"",email:"",password:""})
    let name,value
    const handleInput = (e)=>{
        name = e.target.name
        value=e.target.value
        setUser({...user,[name]:value})
    }

const getUserDetails = async()=>{
    const token = getCookie('jwtoken');
    if(token){
          
      //decode the JWT
    const decoded = jwt_decode(token);

        //get the user ID from the decoded JWT
    const userId = decoded.userId
     const response = await fetch(`${API_URL}/getuserdetails/${userId}`,{
      method:"GET",
      headers:{
        "Content-Type" : "application/json",

        'cookie': 'Token ' + token
      }
     })
     const res = await response.json()
     if (res.status === false || !res) {
      let msg = res.message;
      errorToast(`user not found ${msg}`);
      return;
    } else {
      
      setUser(res.data);
      return;
    }
  }
}
//for initially rendering the user details on page using useEffect
useEffect(() => {
  getUserDetails();
  return
}, []);

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleSaveClick = async(e) => {
    e.preventDefault()
    const {Fullname,email,number,password} = user;
    if(Fullname){
      if(!isValidName(Fullname)){
        errorToast("Name should only contain alphabets")
        return
      }
    }
    if(email){
      if(!isValidateEmail(email)){
        errorToast("Incorrect email correct email format- username@domainname.com")
        return
      }
    }

    if(number){
      if(!isValidNo(number)){
        errorToast("Incorrect phone number")
        return
      }
    }
    if(password){
      if(!passwordVal(password)){
        errorToast("at least 1 lowercase, at least 1 uppercase,contain at least 1 numeric characterat least one special character, range between 8-12")
        return
      }
    }
    const token = getCookie('jwtoken');
    if(token){
      //decode the token
      const decoded = jwt_decode(token)
      const userId = decoded.userId
      const response = await fetch(`${API_URL}/updateUserDetails/${userId}`,{
        method:"PUT",
        headers:{
          "Content-Type" : "application/json",

          'cookie'       : 'Token ' + token
        },
        body : JSON.stringify({
          Fullname,email,number,password
        })
      })
      const res = await response.json()
      if (res.status === false || !res) {
        let msg = res.message;
        errorToast(`user not found ${msg}`);
        return;
      } else {
        
        setUser(res.data);
        successToast("Details have been updated")
        setEditing(false);
        return;
      }
    }
  }

  const handleCancelClick = () => {
    setEditing(false);
  }

  return (
    <div>
      {editing ? (
        <div>
          <form className='edit-form'>
          <div className='Editing-form'>
          <h2>welcome to your profile</h2>
          <div className='edit-details'>
          <label className='label'>Name: </label>
          <input className='input' type="text" name='Fullname' value={user.Fullname} onChange={handleInput} />
          
          <label className='label'>Email: </label>
          <input className='input' type="email" name='email' value={user.email} onChange={handleInput} />
         
          <label className='label'>Phone: </label>
          <input className='input' type="tel" name='number' value={user.number} onChange={handleInput} />
        
          <label className='label'>password: </label>
          <input className='input' type="password" name='password' value={user.password} onChange={handleInput} />
       
          <button className='save' onClick={handleSaveClick}>Save</button>
          <button className='cancel' onClick={handleCancelClick}>Cancel</button>
          </div>
          </div>
          </form>
        </div>
      ) : (
        <div>
          <form className='edit-form'>
            <div className='Editing-form'>
          <h2>welcome to your profile </h2>
          <div className='edit-details'>
            <div>
            <div className='label'>FullName</div>
            <div className='input'>{user.Fullname}</div>
            </div>
            <div>
            <div className='label'>email</div>
            <div className='input'>{user.email}</div>
            </div>
            <div>
            <div className='label'>Phone-number</div>
            <div className='input'>{user.number}</div>
            </div>
            <div>
            <div className='label'>Password</div>
            <div className='input'>*********</div>
            </div>
          </div>

          <button className='edit' onClick={handleEditClick}>Edit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile;
