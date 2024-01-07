import { Box, Button,useColorModeValue, FormControl, FormLabel, Heading, Input, Stack, Alert, AlertIcon } from '@chakra-ui/react'
import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postResetPassword } from '../redux/auth/action'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const init={
    resetPassword:"",
    confirmPassword:""
}

const reducer=(store,{type,payload})=>{
    switch(type){
        case "resetPassword":
            return {...store,resetPassword:payload}
        case "confirmPassword":
            return {...store,confirmPassword:payload}
        default:
            return {...store}
    }

}


const ResetPassword = () => {
    const bgColor=useColorModeValue("gray.300","white.100")
    const [text,setText]=useReducer(reducer,init)
    const {isLoading,isError,data,resetStatus}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const {id}=useParams()
    const navigate=useNavigate()
    const location=useLocation()
    
    const handleButton=()=>{
        if(text){
            dispatch(postResetPassword(id,text))

        }
    }
    useEffect(()=>{
        if(resetStatus){
            navigate(`/auth/login`,{replace:true,state:{from:location}})

        }

    },[resetStatus])

  return (
    <Box minH={'100vh'} bg={bgColor} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack spacing={6}>
            <Box>
                <Heading>Reset Password</Heading>
            </Box>
            <Box bg={useColorModeValue("white")}  px={6} py={8} rounded={'lg'} boxShadow={'lg'}>
                <Stack>
                    {isError && !resetStatus && <Alert>
                        <AlertIcon/>
                        {isError}
                    </Alert> }

                <FormControl>
                    <FormLabel>New-Password</FormLabel>
                    <Input type='text' onChange={(e)=>setText({type:"resetPassword",payload:e.target.value})}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Confrom New-Password</FormLabel>
                    <Input type='text' onChange={(e)=>setText({type:"confirmPassword",payload:e.target.value})}/>
                </FormControl>
                <Button colorScheme='teal' onClick={handleButton} >Reset-Password</Button>
                </Stack>
            </Box>
        </Stack>
    </Box>
  )
}

export default ResetPassword
