import { ADD_FORGET_PASSWORD_FAILURE, ADD_FORGET_PASSWORD_REQUEST, ADD_FORGET_PASSWORD_SUCCESS, ADD_LOGIN_FAILURE, ADD_LOGIN_REQUEST, ADD_LOGIN_SUCCESS, ADD_OTP_VERIFICATION_FAILURE, ADD_OTP_VERIFICATION_REQUEST, ADD_OTP_VERIFICATION_SUCCESS, ADD_REGISTER_FAILURE, ADD_REGISTER_REQUEST, ADD_REGISTER_SUCCESS, ADD_RESEND_OTP_FAILURE, ADD_RESEND_OTP_REQUEST, ADD_RESEND_OTP_SUCCESS, ADD_RESET_PASSWORD_FAILURE, ADD_RESET_PASSWORD_REQUEST, ADD_RESET_PASSWORD_SUCCESS } from "./actionType";
import axios from "axios"

export const addLoginRequest=(payload)=>({
    type:ADD_LOGIN_REQUEST,
    payload
})
export const addLoginSuccess=(payload)=>({
    type:ADD_LOGIN_SUCCESS,
    payload
})
export const addLoginFailure=(payload)=>({
    type:ADD_LOGIN_FAILURE,
    payload
})
export const addregisterRequest=(payload)=>({
    type:ADD_REGISTER_REQUEST,
    payload
})
export const addregisterSucces=(payload)=>({
    type:ADD_REGISTER_SUCCESS,
    payload
})
export const addRegisterFailure=(payload)=>({
    type:ADD_REGISTER_FAILURE,
    payload
    
})

export const addOtpVerifactionRequest=(payload)=>({
    type:ADD_OTP_VERIFICATION_REQUEST,
    payload
})
export const addOtpVerifactionSuccess=(payload)=>({
    type:ADD_OTP_VERIFICATION_SUCCESS,
    payload
})
export const addOtpVerifactionFailure=(payload)=>({
    type:ADD_OTP_VERIFICATION_FAILURE,
    payload
})

export const addForgetPasswordRequest=(payload)=>({
    type:ADD_FORGET_PASSWORD_REQUEST,
    payload
})
export const addForgetPasswordSuccess=(payload)=>({
    type:ADD_FORGET_PASSWORD_SUCCESS,
    payload
})
export const addForgetPasswordFailure=(payload)=>({
    type:ADD_FORGET_PASSWORD_FAILURE,
    payload
})

export const addResetPasswordRequest=(payload)=>({
    type:ADD_RESET_PASSWORD_REQUEST,
    payload
})
export const addResetPasswordSuccess=(payload)=>({
    type:ADD_RESET_PASSWORD_SUCCESS,
    payload
})
export const addResetPasswordFailure=(payload)=>({
    type:ADD_RESET_PASSWORD_FAILURE,
    payload
})

export const addResendOtpRequest=(payload)=>({
    type:ADD_RESEND_OTP_REQUEST,
    payload
})
export const addResendOtpSuccess=(payload)=>({
    type:ADD_RESEND_OTP_SUCCESS,
    payload
})
export const addResendOtpFailure=(payload)=>({
    type:ADD_RESEND_OTP_FAILURE,
    payload
})
export const postLoginData=(payload)=>(dispatch)=>{
    dispatch(addLoginRequest())
    axios.post("auth/login", payload).then((res)=>dispatch(addLoginSuccess(res.data))).catch((err)=>dispatch(addLoginFailure(err.response.data)));
}

export const postRegisterData=(payload)=>(dispatch)=>{
    dispatch(addregisterRequest())
    axios.post("/auth/register",payload).then((res)=>dispatch(addregisterSucces(res.data))).catch((err)=>dispatch(addRegisterFailure(err.response.data)))
}

export const postOtpVerificationData=(id,payload)=>(disptach)=>{
    disptach(addOtpVerifactionRequest())
    axios.post(`/auth/otpverification/${id}`,payload).then((res)=>disptach(addOtpVerifactionSuccess(res.data))).catch((err)=>disptach(addOtpVerifactionFailure(err.response.data)))
}

export const postForgetPasswordData=(payload)=>(dispatch)=>{
    dispatch(addForgetPasswordRequest())
    axios.post("/auth/forgetpassword", payload).then((res)=>dispatch(addForgetPasswordSuccess(res.data))).catch((err)=>dispatch(addForgetPasswordFailure(err.response.data)))
}

export const postResetPassword=(id,payload)=>(dispatch)=>{
    dispatch(addResetPasswordRequest())
    axios.patch(`/auth/forgetpassword/resetpassword/${id}`, payload).then((res)=>dispatch(addResetPasswordSuccess(res.data))).catch((err)=>dispatch(addResetPasswordFailure(err.response.data)))

}

export const postResendOtpData=(payload)=>(dispatch)=>{
    dispatch(addResendOtpRequest())
    axios.post(`/auth/resendotp/${payload}`).then((res)=>addResendOtpSuccess(res.data)).catch((err)=>addResendOtpFailure(err.response.data))
}