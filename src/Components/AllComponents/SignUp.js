import React, {useState} from 'react'
import { NavLink,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  isValidateEmail,
  passwordVal,
  isValidName,
  isValidNo,
  
  
} from "../../Validations/Validations"
// import API_URL from '../../Config/Api-Url';

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

function SignUp() {
  const navigate = useNavigate()
  const [user,setUser] = useState({
    Fullname:"",email:"",number:"",password:"",cpassword:""
  })
  
  let name,value;
  const handleInput = (e)=>{
    console.log(e)
    name = e.target.name
    value = e.target.value
    setUser({...user, [name] : value})
  }
  const postData = async (e) => {
    e.preventDefault();
    const { Fullname, email, number, password, cpassword } = user;
    const trimmedUser = {
      Fullname: Fullname.trim(),
      email: email.trim(),
      number: number.trim(),
      password: password.trim(),
      cpassword: cpassword.trim()
    };
  
    if (!trimmedUser.Fullname || !trimmedUser.email || !trimmedUser.number || !trimmedUser.password || !trimmedUser.cpassword) {
      errorToast("Enter all the details");
      return;
    }
    if (!isValidName(trimmedUser.Fullname)) {
      errorToast("Name should only contain alphabets");
      return;
    }
    if (!isValidateEmail(trimmedUser.email)) {
      errorToast("Incorrect email correct email format- username@domainname.com");
      return;
    }
    if (!isValidNo(trimmedUser.number)) {
      errorToast("Incorrect phone number");
      return;
    }
    if (!passwordVal(trimmedUser.password)) {
      errorToast("at least 1 lowercase, at least 1 uppercase,contain at least 1 numeric characterat least one special character, range between 8-12");
      return;
    }
    if (trimmedUser.password !== trimmedUser.cpassword) {
      errorToast("passwords are not matching");
      return;
    }
  
    const response = await fetch(`https://rapp-t5nt.onrender.com/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trimmedUser)
    });
  
    const res = await response.json();
    if (res.status === false || !res) {
      let msg = res.message;
      errorToast(`login failed because ${msg}`);
    } else {
      successToast('Login was successful!');
      navigate("/Login");
    }
  }
  
  return (
    <>
      <section className='signup'>
          <div className='container mt-1'>
             <div className='signup-content'>
                 <div className='signup-form'>
                   <h2 className='form-title'>Sign Up</h2>
                   <form method="POST" className='register-form' id='register-form'>
                    <div className='form-group'>
                      <label htmlFor='name'>
                        <i className='zmdi zmdi-account material-icons-name'></i>
                      </label>
                      <input type='text' required name='Fullname' id='Fullname' placeholder='Your Name' value={user.name} onChange={handleInput}/>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='email'>
                      <i className='zmdi zmdi-email  material-icons-name'></i>
                      </label>
                      <input type='email'required  name='email' id='email' placeholder='Your Email' value={user.email} onChange={handleInput}/>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='phone'>
                      <i className='zmdi zmdi-phone-in-talk  material-icons-name'></i>
                      </label>
                      <input type='tel' required name='number' id='number'  placeholder='Your phone number' value={user.number} onChange={handleInput}/>
                    </div> 
                    <div className='form-group'>
                      <label htmlFor='password'>
                      <i className='zmdi zmdi-lock  material-icons-name'></i>
                      </label>
                      <input type='password' required name='password' id='password' placeholder='Enter Your password' value={user.password} onChange={handleInput}/>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='cpassword'>
                      <i className='zmdi zmdi-lock  material-icons-name'></i>
                      </label>
                      <input type='password'required  name='cpassword' id='cpassword'  placeholder='Confirm Your password'value={user.cpassword} onChange={handleInput}/>
                    </div>

                    <div className='form-group form-button'>
                      <input type='submit' name='signup' id='signup' className='form-submit' value="register" onClick={postData}/>
                    </div>
                   </form>
                   <div className='signup-image'>
                   
                    <NavLink to="/Login" className="signup-image-link">Already registered</NavLink>
                   </div>
          </div>
        </div>
        </div>
      </section>
    </>
  )
}

export default SignUp