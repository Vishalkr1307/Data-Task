import { Badge, Box, Checkbox, CheckboxGroup, Heading, Stack,Text } from '@chakra-ui/react'
import React from 'react'
import {EditIcon} from "@chakra-ui/icons"
import { Link } from 'react-router-dom'

const TaskCard = ({tittle,tasks_status,tags,description,_id,subTasks}) => {
    const checkBoxStatus=subTasks?.filter((item)=>item.status).map((item)=>item.subTasksTittle)
  return (
   <Box>
     <Stack px={4}>
        <Stack direction={'row'} justify={'space-between'} align={'center'} >
            <Heading>{tittle}</Heading>
            <Link to={`/task/updateTask/${_id}`}>{<EditIcon/>}</Link>
        </Stack>
        <Stack direction={'row'}>
            {tags.length>0 && tags.map((item,ind)=><Badge key={ind} colorScheme='green'>{item}</Badge>)}
        </Stack>
        <Stack>
            <Text>{description}</Text>
        </Stack>
        <Stack>
            <CheckboxGroup defaultValue={checkBoxStatus}>
                {subTasks?.length>0 && subTasks.map((item,ind)=><Checkbox key={ind} value={item.subTasksTittle
                }>{item.subTasksTittle}</Checkbox>)}
            </CheckboxGroup>
        </Stack>
     </Stack>
   </Box>
  )
}

export default TaskCard
