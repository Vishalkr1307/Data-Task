const express=require("express")
const app=express()

const User=require("./modulecontroller/userController")
const Product=require("./modulecontroller/productController")
const session=require("express-session")

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(express.json())
app.use("/auth",User)
app.use("/products",Product)








module.exports=app