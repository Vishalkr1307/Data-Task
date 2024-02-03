const exprees=require("express")
const router=exprees.Router()

const User=require("..//module/user")

const {body,validationResult}=require("express-validator")

const emailChain=()=>body("email").notEmpty().isEmail().withMessage("email is required")

const passwordChain=()=>body("password").notEmpty().isLength({min:5}).withMessage("password is  greater than 5")
const formatOfError=require("..//util/valadation")

const newToken=require("..//util/token")
const SentEmail=require("..//util/sentMail")
const OtpVerification=require("..//module/otpVerification")
const otpVerification = require("..//module/otpVerification")
const bcrypt=require("bcrypt")
const passport=require("..//config/passport")

passport.serializeUser(function({user,token},done){
    done(null,{user,token})

})
passport.deserializeUser(function ({user,token},done){
   done(null,{user,token})
})


router.post("/register",emailChain(),passwordChain(),async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(formatOfError(error.array()).join(","))
        }

        let user=await User.findOne({email:req.body.email}).lean().exec()
        if(user){
            return res.status(400).send("Email has already been registered")
        }
        user=await User.create(req.body)

        return res.status(200).send(user)

    }
    catch(err){
        
        return res.status(400).send("error occurred")
    }
})
router.post("/login",emailChain(),async (req,res)=>{
    try{

        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).send(formatOfError(error.array()).join(","))

        }

        let user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send("Email is not registered")
        }

        const matchPassword=user.checkPassword(req.body.password)
        if(!matchPassword){
            return res.status(400).send("password is incorrect")
        }

        const token=newToken(user)

        const sentData= await SentEmail(user?.email)

        return res.status(200).send(sentData)






    }
    catch(err){
        
        return res.status(400).send("error occurred")
    }
})

router.post("/otpverification/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const {otp}=req?.body
        
        
        const otpData=await OtpVerification.find({userId:id}).lean().exec()
        if(otpData.length==0){
            return res.status(400).send("User not found")
        }
        
        const hashOtp=otpData[0]?.otp
        const expiredAt=otpData[0]?.expiredAt
        if(expiredAt<new Date()){
            await OtpVerification.deleteMany({userId:id})
            return res.status(400).send("Otp has expired")
        }
        else{

            const compareOtp=bcrypt.compareSync(otp,hashOtp)
            
            if(!compareOtp){
                return res.status(400).send("Your otp has incorrect")
            }
            else{
                await OtpVerification.deleteMany({userId:id})
                const user= await User.findByIdAndUpdate(id,{verify:true})
                const token=newToken(user)

                return res.status(200).send({status:"Your otp has verified successfully",token,user})

            }
            
        }

        

    }
    catch(err){
        
        
        return res.status(400).send("error occurred")
    }
})

router.post("/resendotp/:id",async (req,res)=>{
    try{
        const id=req?.params?.id
        const user=await User.findById(id).lean().exec()
        if(!user){
            return res.status(400).send("user not found")
        }
        const sendData=await SentEmail(user?.email)

        return res.status(200).send(sendData)




    }
    catch(err){
        return res.status(400).send("error occurred")
    }
})

router.post("/forgetpassword",async (req,res)=>{
    try{

        const {email}=req.body
        const user=await User.findOne({email: email}).lean().exec()
        if(!user){
            return res.status(400).send("Email does not exist")
        }
        const sendData=await SentEmail(user?.email)
        return res.status(200).send(sendData)

    }
    catch(err){
        return res.status(400).send("error occurred")
    }

})
router.patch("/forgetpassword/resetpassword/:id",async (req,res)=>{
    try{



        const id=req?.params?.id
        const {resetPassword,confirmPassword}=req.body
        if(resetPassword===confirmPassword){
            const hashPassword=bcrypt.hashSync(resetPassword,8)
            const user=await User.findByIdAndUpdate(id,{password:hashPassword})

            if(user){
                return res.status(200).send({
                    status:"password successfully updated"
                })
    
            }
        }
        else{
            return res.status(400).send("resetPassword and confirmPassword doesnot match")
        }




    }
    catch(err){
        return res.status(400).send("error occurred")
    }
} )

router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const user=req.user.user
    const token=req.user.token
    
    return res.status(200).send({user,token})
  });
module.exports=router


