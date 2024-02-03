import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from './Home'
import Task from './Task'
import Login from './Login'
import Register from './Register'
import OtpVerification from '../component/OtpVerification'
import ForgetPassword from '../component/ForgetPassword'
import ResetPassword from '../component/ResetPassword'
import { HStack, Stack } from '@chakra-ui/react'
import SideBar from '../component/SideBar'
import UpdateTask from '../component/UpdateTask'
import AddTask from './AddTask'
import Navbar from '../component/Navbar'
import Paganation from '../component/Paganation'
import ReqAuth from '../component/ReqAuth'
import Searchbar from '../component/Searchbar'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/task/getTask' element={<ReqAuth><Task/></ReqAuth>}/>
        <Route path='/task/addTask' element={<ReqAuth><AddTask/></ReqAuth>}/>
        <Route path='/search' element={<Searchbar/>}/>
        <Route path='/' element={<HStack>
          <Stack  display={{base:"none",md:"flex"}} >
           <SideBar/>

          </Stack>
          <Stack>

           <Task/>
          </Stack>
        </HStack>}/>
        <Route path='/task/updateTask/:id' element={<ReqAuth><UpdateTask/></ReqAuth>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/otpverification/:id' element={<OtpVerification/>}/>
        <Route path='/auth/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/auth/forgetpassword/resetpassword/:id' element={<ResetPassword/>}/>
        <Route path='/auth/register' element={<Register/>}/>
      
    </Routes>
  )
}

export default AllRoutes
