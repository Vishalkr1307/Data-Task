const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    tittle:{type:String,required:true},
    description:{type:String,required:true},
    tasks_status:{type:String,required:true},
    tags:[{type:String,required:true}],
    subTasks:[{subTasksTittle:{type:String,required:true},status:{type:Boolean,default:false}}],
    image_urls:{type:String,required:true}

},{
    versionKey:false,
    timestamps:true
})

module.exports=mongoose.model("product",productSchema)