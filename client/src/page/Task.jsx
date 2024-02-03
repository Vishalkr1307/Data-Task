import React, { useEffect, useState } from 'react'
import {Box,Heading,Stack} from "@chakra-ui/react"
import {Navigate,useLocation} from "react-router-dom"
import TaskCard from '../component/TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskData } from '../redux/app/action'
import TaskStatus from '../component/TaskStatus'
import Pagination from '../component/Paganation'

const Task = () => {
  const {loading,task,singleItem,pageItem,totalItem}=useSelector((store)=>store.app)
  const dispatch=useDispatch()
  const [data,setData]=useState(1)
  const [perPage,setPerPage]=useState(3)
  useEffect(()=>{
    

      dispatch(getTaskData(data,perPage))
    

  },[data])
  
 
  return (
    <Box display={'flex'} maxW={'65vw'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Stack display={'flex'}  minH={'60vh'}  direction={'row'} justify={'space-between'}>
        <Box border={'1px solid yellow'} maxH={'70vh'} width={{base:"60" ,md:"80"}}>
           <TaskStatus task={task} tasks_status="todo"/>
        </Box>
        <Box border={'1px solid yellow'} maxH={'70vh'} width={{base:"60" ,md:"80"}}>
          <TaskStatus task={task} tasks_status="in-progress"/>
        </Box>
        <Box border={'1px solid yellow'} maxH={'70vh'} width={{base:"60" ,md:"80"}}>
          <TaskStatus task={task} tasks_status="done"/>
        </Box>
        
      </Stack>
      <Stack>
        <Pagination data={data} perPage={perPage} setData={setData}/>
      </Stack>
    </Box>
  )
}

export default Task
