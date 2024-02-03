import { Box, FormControl, useColorModeValue,FormLabel, Input, Stack, Select, RadioGroup, Radio, CheckboxGroup, Checkbox, Button, Alert, AlertIcon, Heading } from '@chakra-ui/react'
import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskData } from '../redux/app/action'
const init={
    "tittle":"",
    "description":"",
    "tags":"",
    "tasks_status":"",
    "subTasks":""
}
const reducer=(store,{type,payload})=>{
    switch(type){
        case "tittle":
            return {...store,tittle:payload}
        case "description":
            return {...store,description:payload}
        case "tags":
            return {...store,tags:payload}
        case "tasks_status":
            return {...store,tasks_status:payload}
        case "subTasks":
            return {...store,subTasks:[{"subTasksTittle":payload}]}
        default:
            return {...store}
    }

}

const AddTask = () => {
    const bgColor=useColorModeValue("gray.300","white.100")
    const [text,setText]=useReducer(reducer,init)
    const {token}=useSelector((store)=>store.auth)
    const {error,loading,status}=useSelector((store)=>store.app)
    const dispatch=useDispatch()
    
  
    const handleClick=()=>{
        if(text){
            dispatch(addTaskData(token,text))
        }
    }

  return (
    <Box bg={bgColor} minH={'89vh'} display={'flex'} >
        <Stack justifyContent={'center'} alignItems={'center'} minW={'100vw'}>
            <Box>
                <Heading>Add Task for Database</Heading>
            </Box>
            <Box>
                <Stack width={'60vw'} spacing={10} bg={useColorModeValue("gray.100")} rounded={'xl'} boxShadow={'xl'} px={6} py={8}>
                    {!loading && error && <Alert status='error'>
                        <AlertIcon/>
                        {error}
                        </Alert>}
                    {!loading && !error && status && <Alert status='success'>
                        <AlertIcon/>
                        {status}
                        </Alert>}
                    <FormControl>
                        <FormLabel>Tittle</FormLabel>
                        <Input type='text' onChange={(e)=>setText({type:"tittle",payload:e.target.value})}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input type='text' onChange={(e)=>setText({type:"description",payload:e.target.value})}/>
                    </FormControl>
                    <Select placeholder='Select Task Status' onChange={(val)=>setText({type:"tasks_status",payload:val.target.value})}>
                        <option value={'todo'}>Todo</option>
                        <option value={'in-progress'}>In-Progress</option>
                        <option value={'done'}>Done</option>

                    </Select>
                    <Stack>

                    <CheckboxGroup defaultValue={text.tags} onChange={(val)=>setText({type:"tags",payload:val})}>
                        <Checkbox value={'personal'}>Personal</Checkbox>
                        <Checkbox value={'offical'}>Offical</Checkbox>
                        <Checkbox value={'other'}>Other</Checkbox>
                    </CheckboxGroup>
                    </Stack>
                    <FormControl>
                        <FormLabel>SubTasks-Tittle</FormLabel>
                        <Input type='text' onChange={(e)=>setText({type:"subTasks",payload:e.target.value})}/>
                    </FormControl>
                    <Button colorScheme='teal' onClick={handleClick}>Add-Task</Button>
                </Stack>
            </Box>
        </Stack>
    </Box>
  )
}

export default AddTask
