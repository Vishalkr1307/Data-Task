import React, { useEffect, useReducer, useState } from 'react'
import {Box,Heading,Stack,Text, Image,useColorModeValue, FormControl, FormLabel, Input, HStack, Checkbox, Button, InputGroup, InputRightElement, Alert, AlertIcon, Spinner} from "@chakra-ui/react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {ViewIcon,ViewOffIcon} from "@chakra-ui/icons"
import {useSelector,useDispatch} from "react-redux"
import { store } from '../redux/store'
import { postRegisterData } from '../redux/auth/action'

const initState={
  name:"",
  email:"",
  password: "",
}

const reducer=(store,{type,payload})=>{
  switch(type){
    case "name":
      return {...store,name: payload}
    case "email":
      return {...store,email:payload}
    case "password":
      return {...store,password:payload}
    default:
      return {...store}
  }

}



const Register = () => {
  const bgColor=useColorModeValue("gray.300","white.100")
  const [showPassword,setShowPassword]=useState(false)
  const [text,setText]=useReducer(reducer,initState)
  const {isLoading,isError,token,isAuth,data}=useSelector((store)=>store.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()
  const handleButton=()=>{
    dispatch(postRegisterData(text))
    
  }
  useEffect(()=>{
    if(data?._id){
      navigate(`/auth/login`,{replace:true,state:{from:location}})

    }

  },[data?._id])
  
  return (
    <Box bg={bgColor} width={'100vw'} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      
      <Stack px={2}>
        <Box>
          <Stack alignItems={'center'}>
            <Heading as={'h1'}>Register Into Your Accounts</Heading>
            <Heading fontSize={'2xl'} textAlign={'center'}>to enjoy all  our cool <Text color='blue.400'>Feautures</Text></Heading>
          </Stack>
        </Box>
        <Box>
          <Stack spacing={4} bg={useColorModeValue("white")} rounded={'xl'} boxShadow={'xl'} px={4} py={8}>
            {isError && !data._id && <Alert status='error'>
              <AlertIcon/>
              {isError}
              </Alert>}
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input type='text' onChange={(e)=>setText({type:"name",payload:e.target.value})}/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type='email' onChange={(e)=>setText({type:"email",payload:e.target.value})}/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
              <Input type={showPassword?"text":"password"} onChange={(e)=>setText({type:"password",payload:e.target.value})}/>
              <InputRightElement h={10} onClick={()=>setShowPassword(!showPassword)} >{showPassword?<ViewIcon/>:<ViewOffIcon/>}</InputRightElement>
              </InputGroup>
            </FormControl>
            <Button bg={'teal'} mt={6} onClick={handleButton}
              
            >{isLoading?<Spinner/>:"Register"}</Button>
            <Stack>
                <Heading textAlign={'center'} fontSize={'14'} fontFamily={'sans-serif'}>Already Have A Account ? <Link to="/auth/login"><Text color={'blue.400'} textDecor={'underline'}>Login</Text></Link> </Heading>
            </Stack>

          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default Register
