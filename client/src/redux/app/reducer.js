import { ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESSS, ALL_TASK_FAILURE, ALL_TASK_REQUEST, ALL_TASK_SUCCESSS, GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESSS, SINGLE_TASK_FAILURE, SINGLE_TASK_REQUEST, SINGLE_TASK_SUCCESSS } from "./actionType"

const init={
    loading: false,
    error:false,
    task:[],
    allTask:[],
    singleTask:{},
    pageItem:0,
    totalItem:0,
    status:false
}

export const appReducer=(store=init,{type,payload})=>{
    switch(type){
        case ADD_TASK_REQUEST:
            return {...store,loading:true}
        case ADD_TASK_SUCCESSS:
            return {...store,loading:false,status:payload.status}
        case ADD_TASK_FAILURE:
            return {...store,loading:false,error:payload}
        case ALL_TASK_REQUEST:
            return {...store,loading:true}
        case ALL_TASK_SUCCESSS:
            return {...store,loading:false,allTask:payload}
        case ALL_TASK_FAILURE:
            return {...store,error:payload}
        case GET_TASK_REQUEST:
            return {...store,loading:true}
        case GET_TASK_SUCCESSS:
            return {...store,loading:false,task:payload.product,pageItem:payload.pageItem,totalItem:payload.totalItem}
        case GET_TASK_FAILURE:
            return {...store,error:payload,loading:false}
        case SINGLE_TASK_REQUEST:
            return {...store,loading:true}
        case SINGLE_TASK_SUCCESSS:
            return {...store,loading:false,singleTask:payload}
        case SINGLE_TASK_FAILURE:
            return {...store,loading:false,error:payload}
        
            
        default:
            return {...store}


    }

}