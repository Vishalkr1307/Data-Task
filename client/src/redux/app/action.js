import axios from "axios";
import { ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESSS, ALL_TASK_FAILURE, ALL_TASK_REQUEST, ALL_TASK_SUCCESSS, DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESSS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESSS, SINGLE_TASK_FAILURE, SINGLE_TASK_REQUEST, SINGLE_TASK_SUCCESSS, UPDATE_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESSS } from "./actionType";

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

export const allTaskRequest=(payload)=>({
    type:ALL_TASK_REQUEST,
    payload
})
export const allTaskSuccess=(payload)=>({
    type:ALL_TASK_SUCCESSS,
    payload
})

export const allTaskFailure=(payload)=>({
    type:ALL_TASK_FAILURE,
    payload
})

export const allTaskData=(payload)=>(dispatch)=>{
    dispatch(allTaskRequest())
    axios.get("products/allTask").then((res)=>dispatch(allTaskSuccess(res.data))).catch((err)=>dispatch(allTaskFailure(err.response.data)))
}


export const addTaskData=(token,payload)=>(dispatch)=>{
    dispatch(addTaskRequest())
    
   
    
    axios.post("/products/addTask",payload,{headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",  
        "Authorization": `Bearer ${token}`
        }   
    }).then((res)=>dispatch(addTaskSuccess(res.data))).catch((err)=>dispatch(addTaskFailure(err.response.data
        ))) 
}

export const getTaskData=(payload,perPage)=>(dispatch)=>{
    dispatch(getTaskRequest())
    axios.get(`/products/getTask?page=${payload}&limit=${perPage}`).then((res)=>dispatch(getTaskSuccess(res.data))).catch((err)=>dispatch(getTaskFailure(err.respose.data)))
}

export const singleTaskData=(payload)=>(dispatch)=>{
    dispatch(singleTaskRequest())
    axios.get(`/products/singleTask/${payload}`).then((res)=>dispatch(singleTaskSuccess(res.data))).catch((err)=>dispatch(singleTaskFailure(err.response.data)))

}

export const updateTaskData=(id,payload)=>(dispatch)=>{
    dispatch(updateTaskRequest())
    axios.patch(`/products/updateTask/${id}`,payload).then((res)=>dispatch(singleTaskData(id))).catch((err)=>console.log(err.response.data))
}
export const deleteTaskData=(payload)=>(dispatch)=>{
    dispatch(deleteTaskRequest())
    axios.delete(`/products/deleteTask/${payload}`)
}