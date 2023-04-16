import React, { useState } from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
function Login(props) {
  const navigate = useNavigate()
const [email,setEmail] = useState()
const [password, setPassword] = useState()

 const handleLogin = async (e)=>{
  e.preventDefault()

  if(!email){
    errorToast("Email is required")
    return;
  }
  if(!password){
    errorToast("Password is required")
    return;
  }
  
  const response = await fetch(`${API_URL}/login`, {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({email,password})
  })
  const res = await response.json()
 
  
    if(res.status===false || !res){
      let msg = res.message
      errorToast(`login failed because ${msg}`);
      return;
    }
    else{
      successToast('Login was successfull!');
         navigate("/")
         props.setLoggedIn(true);
        }
  
 }
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
                      <input type='email' className='email' id='email' autoComplete='off' placeholder='Your Email' value={email} 
                      onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                   
                    <div className='form-group'>
                      <label htmlFor='password'>
                      <i className='zmdi zmdi-lock  material-icons-name'></i>
                      </label>
                      <input type='password' className='password' id='password' autoComplete='off' placeholder='Enter Your password' value={password} 
                      onChange={(e)=> setPassword(e.target.value)}/>
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