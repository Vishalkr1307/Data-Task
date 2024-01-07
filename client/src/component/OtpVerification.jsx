import React, { useEffect, useState } from 'react'
import {Box, HStack, Text,Heading, PinInput, PinInputField, Stack, useColorMode, useColorModeValue, Button, Alert, AlertIcon} from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { postOtpVerificationData, postResendOtpData } from '../redux/auth/action'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const OtpVerification = () => {
  const {isAuth,data,otpStatus,token,isError}=useSelector((store)=>store.auth)
  const bgColor=useColorModeValue("gray.300","white.100")
  const dispatch=useDispatch()
  const {id}=useParams()
  const navigate=useNavigate()
  const location=useLocation()
  const [text,setText]=useState({
    "otp":""
  })
  
  const handleButton=()=>{
    dispatch(postOtpVerificationData(id,text))
  }
  const handleResend=()=>{
    if(id){
      alert(`Otp Resend your Eamil ${data?.email}`)
      dispatch(postResendOtpData(id))
    }
  }
  useEffect(()=>{
    if(otpStatus){
      navigate("/home",{replace:true,state:{from:location}})
    }


  },[otpStatus])
  console.log(location)
  return (
    <Box minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
        <Stack spacing={6}>
            <Box>
              <Heading textAlign={'center'}>Otp sent Your email <Text color="blue">{data?.email}</Text>  </Heading>
            </Box>
            
            <Box>
              <Stack spacing={4}>
                {isError && !otpStatus && <Alert status='error'>
                  <AlertIcon/>
                  {isError}
                  </Alert>}

               <HStack justifyContent={'center'} alignItems={'center'}>
                <PinInput otp onChange={(val)=>setText({"otp":val})}>
                  <PinInputField/>
                  <PinInputField/>
                  <PinInputField/>
                  <PinInputField/>
                </PinInput>
               </HStack>
               <Stack>

                <Text textAlign={'center'} color="blue" cursor={'pointer'} onClick={handleResend}>Resend It</Text>
                <Button colorScheme='teal' onClick={handleButton}>Submit-Otp</Button>
               </Stack>
              </Stack>
            </Box>
        </Stack>
    </Box>
  )
}

export default OtpVerification
