const mongoose=require("mongoose")
require("dotenv").config()

module.exports=()=>{
    return mongoose.connect(process.env.DB).then(()=>console.log("database connection established")).catch(()=>console.log("database connection failed"))
}