import React, { useState } from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate()
const [email,setEmail] = useState()
const [password, setPassword] = useState()
 const handleLogin = async (e)=>{
  e.preventDefault()
  
  const response = await fetch("/login", {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({email,password})
  })
  const res = await response.json()
    if(res.status===400 || !res){
      toast.error('login failed!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.success('Login was successfull!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
         navigate("/ContactUs")
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
                      <input type='email' name='email' id='email' autoComplete='off' placeholder='Your Email' value={email} 
                      onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                   
                    <div className='form-group'>
                      <label htmlFor='password'>
                      <i className='zmdi zmdi-lock  material-icons-name'></i>
                      </label>
                      <input type='password' name='password' id='password' autoComplete='off' placeholder='Enter Your password' value={password} 
                      onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                   

                    <div className='form-group form-button'>
                      <input type='submit' name='signin' id='signin' className='form-submit' value="Log In"
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