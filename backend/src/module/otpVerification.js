const mongoose=require("mongoose")

const otpSchema=new mongoose.Schema({
    otp:{type:String,required:true},
    userId:{type:String,required:true},
    createdAt:Date,
    expiredAt:Date
})
module.exports=mongoose.model('otp',otpSchema)
