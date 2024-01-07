import { ADD_FORGET_PASSWORD_FAILURE, ADD_FORGET_PASSWORD_REQUEST, ADD_FORGET_PASSWORD_SUCCESS, ADD_LOGIN_FAILURE, ADD_LOGIN_REQUEST, ADD_LOGIN_SUCCESS, ADD_OTP_VERIFICATION_FAILURE, ADD_OTP_VERIFICATION_REQUEST, ADD_OTP_VERIFICATION_SUCCESS, ADD_REGISTER_FAILURE, ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS, ADD_RESEND_OTP_FAILURE, ADD_RESEND_OTP_REQUEST, ADD_RESEND_OTP_SUCCESS, ADD_RESET_PASSWORD_FAILURE, ADD_RESET_PASSWORD_REQUEST, ADD_RESET_PASSWORD_SUCCESS } from "./actionType"

const init={
    isLoading:false,
    isError:false,
    isAuth:false,
    token:"",
    data:{},
    otpStatus:"",
    resetStatus:""

}

 const authReducer=(store=init,{type,payload})=>{
    switch(type){
        case ADD_LOGIN_REQUEST:
            return {...store,isLoading:true}
        case ADD_LOGIN_SUCCESS:
            return {...store,isLoading:false,data:payload}
        case ADD_LOGIN_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_OTP_VERIFICATION_REQUEST:
            return {...store,isLoading:true}
        case ADD_OTP_VERIFICATION_SUCCESS:
            return {...store,isLoading:false,isAuth:true,otpStatus:payload.status,token:payload.token}
        case ADD_OTP_VERIFICATION_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_RESEND_OTP_REQUEST:
            return {...store,isLoading:true}
        case ADD_RESEND_OTP_SUCCESS:
            return {...store,isLoading:false,data:payload}
        case ADD_RESEND_OTP_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_FORGET_PASSWORD_REQUEST:
            return {...store,isLoading:true}
        case ADD_FORGET_PASSWORD_SUCCESS:
            return {...store,isLoading:false,data:payload}
        case ADD_FORGET_PASSWORD_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_RESET_PASSWORD_REQUEST:
            return {...store,isLoading:true}
        case ADD_RESET_PASSWORD_SUCCESS:
            return {...store,isLoading:false,resetStatus:payload.status}
        case ADD_RESET_PASSWORD_FAILURE:
            return {...store,isLoading:false,isError:payload}
        case ADD_REGISTER_REQUEST:
            return {...store,isLoading:true}
        case ADD_REGISTER_SUCCESS:
            return {...store,isLoading:false,data:payload}
        case ADD_REGISTER_FAILURE:
            return {...store,isLoading:false,isError:payload}


        default:
            return {...store}
    }

}
export default authReducer