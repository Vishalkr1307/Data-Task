const express=require("express")
const app=express()

const User=require("./modulecontroller/userController")
const Product=require("./modulecontroller/productController")
const session=require("express-session")
const cors=require("cors")
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(express.json())
app.use(cors())
app.use("/auth",User)
app.use("/products",Product)

app.get("/",(req,res)=>{
    return res.send("Welcome to the cat")
})








module.exports=app