import React, { useState } from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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
function Login(props) {
  const navigate = useNavigate()
const [email,setEmail] = useState()
const [password, setPassword] = useState()

const handleInput = async (e)=>{
  const {name,value} = e.target
  if(name === "email"){
    setEmail(value)
  }
  else if(name === "password"){
    setPassword(value)
  }

}


const handleLogin = async (e) => {
  try {
    e.preventDefault();
    if (!email) {
      errorToast("Email is required");
      return;
    }
    if (!password) {
      errorToast("Password is required");
      return;
    }

    const response = await axios.post(`http://localhost:4500/login`, {
      email,
      password,
    }, {
      credentials: 'include' // set credentials to 'include'

    });

    const res = response.data;
    
    localStorage.setItem('token', res.data.token);

    if (res.status === false || !res) {
      let msg = res.message;
      errorToast(`login failed because ${msg}`);
      return;
    } else {
      successToast("Login was successful!");
      navigate("/");
      props.setLoggedIn(true);
    }
  } catch (error) {
    throw error;
  }
};
const token = localStorage.getItem('token')
console.log(token,"login")

//  const handleLogin = async (e)=>{
//   try {
//     e.preventDefault()
//     if(!email){
//     errorToast("Email is required")
//     return;
//   }
//   if(!password){
//     errorToast("Password is required")
//     return;
//   }
  
//   const response = await fetch(`http://localhost:4500/login`, {
//     method:"POST",
//     headers:{
//       "Content-Type":"application/json"
//     },
//     body: JSON.stringify({email,password})
//   })
//   const res = await response.json()
 
  
//     if(res.status===false || !res){
//       let msg = res.message
//       errorToast(`login failed because ${msg}`);
//       return;
//     }
//     else{
//       successToast('Login was successfull!');
//          navigate("/")
//          props.setLoggedIn(true);
//         }
//       } catch (error) {
//              throw error
//       }
  
//  }
  return (
    <>
     <section className='signin'>
          <div className='container mt-5'>
             <div className='signIn-content'>
            
                 <div className='signIn-form'>
                   <h2 className='form-title'>Sign In</h2>

                   <form method='POST' className='login-form' id='login-form'>
                  
                    <div className='form-group'>
                      <label htmlFor='email'>
                      <i className='zmdi zmdi-email  material-icons-name'></i>
                      </label>
                      <input type='email' name='email' className='email' id='email' autoComplete='off' placeholder='Your Email' value={email} 
                      onChange={handleInput}/>
                    </div>
                   
                    <div className='form-group'>
                      <label htmlFor='password'>
                      <i className='zmdi zmdi-lock  material-icons-name'></i>
                      </label>
                      <input type='password' name='password' className='password' id='password' autoComplete='off' placeholder='Enter Your password' value={password} 
                      onChange={handleInput}/>
                    </div>
                   

                    <div className='form-group form-button'>
                      <input type='submit'  id='signin' className='form-submit' value="Log In"
                      onClick={handleLogin}/>
                    </div>

                    <div className='signIn-image'>
                   
                   <NavLink to="/SignUp" className="signup-image-link">Create account</NavLink>
                  </div>
                   </form>
                   
          </div>
        </div>
        </div>
      </section>
    </>
  )
}

export default Login