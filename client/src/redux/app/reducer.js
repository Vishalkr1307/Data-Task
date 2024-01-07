import { ADD_TASK_REQUEST } from "./actionType"

const init={
    loading: false,
    error:false,
    task:[],
    singleTask:{}
}

export const appReducer=(store=init,{type,payload})=>{
    switch(type){
        case ADD_TASK_REQUEST:
            return {...store,loading:true}
        default:
            return {...store}


    }

}