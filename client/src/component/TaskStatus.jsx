import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import TaskCard from './TaskCard'
import { useSearchParams } from 'react-router-dom'

const TaskStatus = ({task,tasks_status}) => {
    const [serchParam]=useSearchParams()
    const filterParamTag=(task)=>{
        const newParamTag=serchParam.getAll("tags")
        if(newParamTag.includes("all") || newParamTag.length==0){
            return task
        }
        const data=task.tags.filter((item)=>newParamTag.includes(item)?true:false)
        if(data.length){
            return task
        }
        else{
            return false
        }
        
    }
  return (
    <Box>
        <Stack spacing={6} align={'center'}>
            <Stack>
                <Heading>{tasks_status.toUpperCase()}</Heading>

            </Stack>
            <Stack spacing={6}>
                {task.length>0 && task.filter((item)=>item.tasks_status===tasks_status).filter(filterParamTag).map((item,ind)=><TaskCard key={ind} {...item}/>)}
            

            </Stack>
        </Stack>
    </Box>
  )
}

export default TaskStatus
