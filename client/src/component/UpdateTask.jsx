import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleTaskData, updateTaskData } from "../redux/app/action";
import { DeleteIcon } from "@chakra-ui/icons";

const UpdateTask = () => {
  const { task,singleTask } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const {id}=useParams()
  const [tittle,setTittle]=useState("")
  const [description,setDescription]=useState("")
  const [tasksStatus,setTasksStatus]=useState("")
  const [tags,setTags]=useState([])
  const [subTasks,setSubTasks]=useState([])
  const [subTasksTittle,setSubTasksTittle]=useState("")
  const [checkbox,setCheckbox]=useState([])


  useEffect(()=>{
    
      if(id){
        dispatch(singleTaskData(id))
        
      }
    
    

  },[id])
  useEffect(()=>{
    if(singleTask){
      setTittle(singleTask.tittle)
      setDescription(singleTask.description)
      setTasksStatus(singleTask.tasks_status)
      setTags(singleTask.tags)
      setSubTasks(singleTask.subTasks)

      let data=singleTask?.subTasks?.filter((item)=>item.status && item.subTasksTittle).map((item)=>item.subTasksTittle)
      setCheckbox(data)

     

    }

  },[singleTask])
  
  
  

  const handleUpdate=(val,data)=>{
    if(val==="tittle"){
      dispatch(updateTaskData(id,{tittle:tittle,description:description}))
    }
    else if(val==="tasks_status"){
      dispatch(updateTaskData(id,{tasks_status:data}))
    }
    else if(val==="tags"){
      dispatch(updateTaskData(id,{tags:data}))
    }
    else if(val==="subTasks"){
      if(subTasksTittle){
        
        var newSubTask=[...subTasks,{subTasksTittle:subTasksTittle}]
        
      }
      dispatch(updateTaskData(id,{subTasks:newSubTask}))
    }
    else if(val==="checkbox"){
      const update=subTasks.map((item)=>{
        if(data.includes(item.subTasksTittle)){
          return {...item,status:true}
        }
        else{
          return {...item,status:false}
        }
      })
      dispatch(updateTaskData(id,{subTasks:update}))
      
    }
    else if(val==="delete"){
      var data=subTasks.filter((item)=>item.subTasksTittle!=data)
      dispatch(updateTaskData(id,{subTasks:data}))
    }

  }
  

  
  return (
    <Box maxH={'70vh'} >
      <Stack direction={"row"} px={4} fontSize={'2xl'} width={'100vw'} justifyContent={"space-around"} alignItems={'center'}>
        <Box
          minH={"70vh"}
          px={4}
          py={6}
          width={"40vw"}
          
        >
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Tittle</FormLabel>
              <Input type="text" value={tittle||""} onChange={(e)=>setTittle(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input type="text" value={description ||""} onChange={(e)=>setDescription(e.target.value)}  />
            </FormControl>
            <Button colorScheme="teal" onClick={()=>handleUpdate("tittle")}>Update-Task</Button>
          </Stack>
          <Stack mt={10} >
            <RadioGroup value={tasksStatus}  onChange={(val)=>{
              setTasksStatus(val)
              handleUpdate("tasks_status",val)
            }}>
              <Stack >
                <Radio  value="todo">Todo</Radio>
                <Radio value="in-progress">In-Progress</Radio>
                <Radio value="done">Done</Radio>
              </Stack>
            </RadioGroup>
            <Stack mt={10}>

            <CheckboxGroup mt={8} value={tags} onChange={(val)=>{
              setTags(val)
              handleUpdate("tags",val)
            }}>
              <Checkbox value="personal">Personal</Checkbox>
              <Checkbox value="offical">Offical</Checkbox>
              <Checkbox value="other">Other</Checkbox>
            </CheckboxGroup>
            </Stack>
          </Stack>
        </Box>
        <Box minH={"70vh"} width={"40vw"} >
          <Stack px={4} py={6} spacing={8}>
            <Stack spacing={6}>
                <FormControl>
                    <FormLabel>Add-SubTask</FormLabel>
                    <Input type="text" onChange={(e)=>setSubTasksTittle(e.target.value)}/>

                </FormControl>
                <Button colorScheme="teal" onClick={()=>handleUpdate("subTasks")}>Add-SubTask</Button>
            </Stack>
            <Stack spacing={6}>
              <CheckboxGroup value={checkbox} onChange={(val)=>{
                setCheckbox(val)
                handleUpdate("checkbox",val)
              }}>
                {subTasks?.length>0 && subTasks.map((task,ind)=><Stack key={ind} direction={'row'} justifyContent={'space-between'}>
                  <Checkbox value={task.subTasksTittle}>{task.subTasksTittle}</Checkbox>
                  <IconButton icon={<DeleteIcon/>} size={'lg'} variant={'outline'} cursor={'pointer'} onClick={()=>handleUpdate("delete",task.subTasksTittle)}/>
                </Stack>)}
              </CheckboxGroup>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default UpdateTask;
