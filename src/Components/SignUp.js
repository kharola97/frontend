import React, {useState} from 'react'
import { NavLink,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const postData = async (e)=>{
    
         e.preventDefault()
         const {Fullname,email,number,password,cpassword} = user;
        //  if(!name|| !email || !number || !password || !cpassword){
        //   alert("Enter all the details")
        // return;}
        console.log(user)
        const response =  await fetch("/register",{
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            Fullname,email,number,password,cpassword
          })

        })
        console.log(JSON.stringify({Fullname,email,number,password,cpassword}))
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
          navigate("/Login")
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
                      <input type='text' required name='Fullname' id='Fullname' autoComplete='off' placeholder='Your Name' value={user.name} onChange={handleInput}/>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='email'>
                      <i className='zmdi zmdi-email  material-icons-name'></i>
                      </label>
                      <input type='email'required  name='email' id='email' autoComplete='off' placeholder='Your Email' value={user.email} onChange={handleInput}/>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='phone'>
                      <i className='zmdi zmdi-phone-in-talk  material-icons-name'></i>
                      </label>
                      <input type='tel' required name='number' id='number' autoComplete='off' placeholder='Your phone number' value={user.number} onChange={handleInput}/>
                    </div> 
                    <div className='form-group'>
                      <label htmlFor='password'>
                      <i className='zmdi zmdi-lock  material-icons-name'></i>
                      </label>
                      <input type='password' required name='password' id='password' autoComplete='off' placeholder='Enter Your password' value={user.password} onChange={handleInput}/>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='cpassword'>
                      <i className='zmdi zmdi-lock  material-icons-name'></i>
                      </label>
                      <input type='password'required  name='cpassword' id='cpassword' autoComplete='off' placeholder='Confirm Your password'value={user.cpassword} onChange={handleInput}/>
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