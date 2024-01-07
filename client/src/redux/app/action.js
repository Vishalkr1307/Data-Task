import axios from "axios";
import { ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESSS, DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESSS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESSS, SINGLE_TASK_FAILURE, SINGLE_TASK_REQUEST, SINGLE_TASK_SUCCESSS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESSS } from "./actionType";

export const addTaskRequest=(payload)=>({
    type:ADD_TASK_REQUEST,
    payload
})

export const addTaskSuccess=(payload)=>({
    type:ADD_TASK_SUCCESSS,
    payload
})

export const addTaskFailure=(payload)=>({
    type:ADD_TASK_FAILURE,
    payload
})

export const getTaskRequest=(payload)=>({
    type:GET_TASK_REQUEST,
    payload
})

export const getTaskSuccess=(payload)=>({
    type:GET_TASK_SUCCESSS,
    payload
})

export const getTaskFailure=(payload)=>({
    type:GET_TASK_FAILURE,
    payload
})

export const singleTaskRequest=(payload)=>({
    type:SINGLE_TASK_REQUEST,
    payload
})

export const singleTaskSuccess=(payload)=>({
    type:SINGLE_TASK_SUCCESSS,
    payload
})

export const singleTaskFailure=(payload)=>({
    type:SINGLE_TASK_FAILURE,
    payload
})


export const updateTaskRequest=(payload)=>({
    type:UPDATE_TASK_REQUEST,
    payload
})

export const updateTaskSuccess=(payload)=>({
    type:UPDATE_TASK_SUCCESSS,
    payload
})

export const updateTaskFailure=(payload)=>({
    type:UPDATE_TASK_FAILURE,
    payload
})


export const deleteTaskRequest=(payload)=>({
    type:DELETE_TASK_REQUEST,
    payload
})

export const deleteTaskSuccess=(payload)=>({
    type:DELETE_TASK_SUCCESSS,
    payload
})

export const deleteTaskFailure=(payload)=>({
    type:DELETE_TASK_FAILURE,
    payload
})


export const addTaskData=(payload)=>(dispatch)=>{
    dispatch(addTaskRequest())
    axios.post("/products/addTask", payload)
}

export const getTaskData=(payload)=>(dispatch)=>{
    dispatch(getTaskRequest())
    axios.get("/products/getTask")
}

export const singleTaskData=(payload)=>(dispatch)=>{
    dispatch(singleTaskRequest())
    axios.get(`/products/singleTask/${payload}`)

}
export const deleteTaskData=(payload)=>(dispatch)=>{
    dispatch(deleteTaskRequest())
    axios.delete(`/products/deleteTask/${payload}`)
}