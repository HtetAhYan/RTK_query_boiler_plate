import React from 'react'

import { useLoginMutation } from '../api/apiSlice';

import {useDispatch} from 'react-redux'
import { logOut } from '../features/authSlice';
function Auth() {
    const [login]=useLoginMutation();
 
 
  const dispatch=useDispatch();
  
    const handleLogin=()=>{
      const data=login({credential:"win@gmail.com",password:"password"}).unwrap()
      console.log(data)
    }
    const handleLogout=()=>{
dispatch(logOut())
    }
  return (
    <div>
        <form action="submit">

            <input type="text" />
            <input type="password" />
        </form>
<button onClick={handleLogin} >Login</button>
<button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Auth