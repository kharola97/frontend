import React, { useState } from 'react';
import Login from './LoginForm';
import Signup from './SignUpForm';

const LoginSignupPage = () => {
    const [isLogin, setLogin] = useState(true); // state for showing login or signup form
  
    return (
      <div>
        <h1>{isLogin ? 'Login' : 'Signup'}</h1>
        {isLogin ? (
          <Login setLogin={setLogin} />
        ) : (
          <Signup setLogin={setLogin} />
        )}
      </div>
    );
  };
  
  export default LoginSignupPage;
  
