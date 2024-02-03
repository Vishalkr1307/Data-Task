import { Box, Button, Flex, Heading, Stack,Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getTaskData } from '../redux/app/action'

const SideBar = () => {
    const [serchParam,setSerchParam]=useSearchParams()
    const [searchTag,setSearchTag]=useState([])
    const {task}=useSelector((store)=>store.app)
    const {user}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const naviagte=useNavigate()
    const location=useLocation()
    const handleTag=(val)=>{
        const newParam=[...searchTag]
      if(searchTag.includes(val)){
        newParam.splice(searchTag.indexOf(val),1)
      }
      else(
        newParam.push(val)
      )
      setSearchTag(newParam)

    }
    useEffect(()=>{
        if(searchTag){
            setSerchParam({tags:searchTag},{replace:true})
        }
    },[searchTag,serchParam,setSerchParam])
    useEffect(()=>{
        if(task.length==0){
            dispatch(getTaskData())
        }
    },[task.length])

    const All=task.length
    const Personal=task.filter((item)=>item.tags.includes("personal")).length
    const Offical=task.filter((item)=>item.tags.includes("offical")).length
    const Other=task.filter((item)=>item.tags.includes("other")).length

    const handleLogout=()=>{
        localStorage.clear("token")
        localStorage.clear("user")
        naviagte("/auth/login",{replace:true,state:{from:location}})
    }
    
  return (
      <Box display={'flex'}  flexDirection={'column'} minH={'70vh'} justifyContent={'space-between'}  minW={{base:"50",md:"80"}} px={8}>
        <Stack justifyContent={'space-between'}>
            <Box minH={'30'}>
                <Heading textAlign={'center'}>{user?.name||"Login to your account"}</Heading>
            </Box>

            <Stack minH={'80'} justifyContent={'center'} spacing={6} >
                <Flex justifyContent={'space-between'} py={4} px={4} align={'center'} rounded={'xl'} bg={serchParam.getAll("tags").includes("all")?"teal":"greenyellow"} cursor={'pointer'} onClick={()=>handleTag("all")} >
                    <Text>All</Text>
                    <Text>{All}</Text>
                </Flex>
                <Flex justifyContent={'space-between'} py={4} px={4} align={'center'} rounded={'xl'} cursor={'pointer'} bg={serchParam.getAll("tags").includes("personal")?"teal":"red.300"} onClick={()=>handleTag("personal")}>
                    <Text>Personal</Text>
                    <Text>{Personal}</Text>
                </Flex>
                <Flex justifyContent={'space-between'} py={4} px={4} align={'center'} rounded={'xl'} cursor={'pointer'} bg={serchParam.getAll("tags").includes("offical")?"teal":"pink"} onClick={()=>handleTag("offical")}>
                    <Text>Offical</Text>
                    <Text>{Offical}</Text>
                </Flex>
                <Flex justifyContent={'space-between'} py={4} px={4} align={'center'} rounded={'xl'} cursor={'pointer'} bg={serchParam.getAll("tags").includes("other")?"teal":"green"} onClick={()=>handleTag("other")}>
                    <Text>Other</Text>
                    <Text>{Other}</Text>
                </Flex>
            </Stack>
            
             
            
        </Stack>
        <Stack mt={'//#endregion'}>
            <Button colorScheme='teal' onClick={handleLogout}>LogOut</Button>

        </Stack>
      </Box>
  )
}

export default SideBar
