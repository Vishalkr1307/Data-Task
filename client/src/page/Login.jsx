import React, { useEffect, useReducer, useState } from 'react'
import {Box,Heading,Stack,Text, Image,useColorModeValue, FormControl, FormLabel, Input, HStack, Checkbox, Button, InputGroup, InputRightElement, Spinner, Alert, AlertIcon} from "@chakra-ui/react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {ViewIcon,ViewOffIcon} from "@chakra-ui/icons"
import {useSelector,useDispatch} from "react-redux"
import { store } from '../redux/store'
import { postLoginData } from '../redux/auth/action'

const initState={
  email:"",
  "password": "",
}

const reducer=(store,{type,payload})=>{
  switch(type){
    case "email":
      return {...store,email:payload}
    case "password":
      return {...store,password:payload}
    default:
      return {...store}
  }

}


const Login = () => {
  const bgColor=useColorModeValue("gray.300","white.100")
  const [showPassword,setShowPassword]=useState(false)
  const [text,setText]=useReducer(reducer,initState)
  const {isLoading,isAuth,isError,token,data}=useSelector((store)=>store.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()
  const handleButton=()=>{
    dispatch(postLoginData(text))
    
  }
  // console.log(data,isError,isLoading)

  useEffect(()=>{
    if(data.status && data.userId )
    navigate(`/auth/otpverification/${data?.userId}`, {replace:true,state:{from:location}})

  },[data.status,data.Id])

  return (
    <Box bg={bgColor} width={'100vw'} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      
      <Stack px={2}>
        <Box>
          <Stack alignItems={'center'}>
            <Heading as={'h1'}>Login Into Your Accounts</Heading>
            <Heading fontSize={'2xl'} textAlign={'center'}>to enjoy all  our cool <Text color='blue.400'>Feautures</Text></Heading>
          </Stack>
        </Box>
        <Box>
          <Stack spacing={4} bg={useColorModeValue("white")} rounded={'xl'} boxShadow={'xl'} px={4} py={8}>
            {isError && !data.status && <Alert status='error'>
              <AlertIcon/>
              {isError}
              </Alert>}

              {data.status && <Alert status='success'>
                <AlertIcon/>
                {data.status}
                </Alert>}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type='email' onChange={(e)=>setText({type:"email",payload:e.target.value})}/>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
              <Input type={showPassword?'text':'password'} onChange={(e)=>setText({type:"password",payload:e.target.value})}/>
              <InputRightElement h={10} onClick={()=>setShowPassword(!showPassword)} >{showPassword?<ViewIcon/>:<ViewOffIcon/>}</InputRightElement>
              </InputGroup>
            </FormControl>
            <HStack justifyContent={'space-between'} alignItems={'center'} px={2} >
              <Checkbox>Remember Me</Checkbox>
              
              <Link to="/auth/forgetpassword"><Text color={'blue.400'} cursor={'pointer'}>Forget Password</Text></Link>

            </HStack>
            <Button bg={'teal'} onClick={handleButton}
              
            >{isLoading?<Spinner/>:"Login"}</Button>
            <Stack>
                <Heading textAlign={'center'} fontSize={'14'} fontFamily={'sans-serif'}>Did't Have A Account ? <Link to="/auth/register"><Text color={'blue.400'} textDecor={'underline'}>Register</Text></Link> </Heading>
            </Stack>

          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default Login
