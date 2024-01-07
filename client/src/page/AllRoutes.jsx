import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from './Home'
import Task from './Task'
import Login from './Login'
import Register from './Register'
import OtpVerification from '../component/OtpVerification'
import ForgetPassword from '../component/ForgetPassword'
import ResetPassword from '../component/ResetPassword'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/task' element={<Task/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/otpverification/:id' element={<OtpVerification/>}/>
        <Route path='/auth/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/auth/forgetpassword/resetpassword/:id' element={<ResetPassword/>}/>
        <Route path='/auth/register' element={<Register/>}/>
      
    </Routes>
  )
}

export default AllRoutes
