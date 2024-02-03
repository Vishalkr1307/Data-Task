import { Box, Button,useColorModeValue, FormControl, FormLabel, Input, Stack, Heading, Alert, AlertIcon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postForgetPasswordData } from '../redux/auth/action'

import { useLocation, useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
  const {isLoading,isError,data}=useSelector((store)=>store.auth)
  const bgColor=useColorModeValue("gray.300","white.100")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()

  const [text,setText]=useState({
    email:""
  })
  const handleButton=()=>{
    if(text){
      dispatch(postForgetPasswordData(text))
    }
  }
  console.log(data)
  useEffect(()=>{
    if(data.status && data.userId){
      navigate(`/auth/otpverification/${data?.userId}`,{replace:true,state:{from:location}})

    }

  },[data.status,data.userId])
  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'}  >
      <Stack spacing={4} minW={'100vw'} justifyContent={'center'} alignItems={'center'}>
        <Box>
          <Heading>Forget-password</Heading>
        </Box>
        <Box bg={useColorModeValue("white")} px={4} py={8} rounded={'xl'} boxShadow={'xl'}>
          <Stack spacing={6}>
            {isError && !data.userId && <Alert status='error'>
              <AlertIcon/>
              {isError}
              </Alert>}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type='email' onChange={(e)=>setText({email:e.target.value})}/>
            </FormControl>
            <Button colorScheme='teal' onClick={handleButton} >Forget-Password</Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default ForgetPassword
