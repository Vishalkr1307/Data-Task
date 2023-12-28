const multer=require("multer")

const path=require("path")

const diskstorage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname,"..//upload"))

    },
    filename:function (req,file,cb){
        cb(null,file.fieldname + "-" + Math.round(Math.random()*9000+1000))
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png" || file.mimetype==="image/gif" || file.mimetype==="image/jpg"){
        cb(null,true)

    }
    else{
        cb(null,false)
    }

}

const upload=multer({
    storage:diskstorage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5
    }
})


const uploadSingle=(image_url)=>{
    return (req,res,next)=>{
        const uploadItem=upload.single(image_url)
        uploadItem(req,res,function (err){
            if(err instanceof multer.MulterError){
                return res.status(400).send({message:err.message,errorTupe:"Multer error"})
            }
             else if(err){
                return res.status(400).send({message:err.message,errorTupe:"Normal error"})


             }
             else{
                next()
             }
        })

        
    }

}

const uploadMultiple=(fileCount,image_url)=>{
    return (req,res,next)=>{
        const uploadItem=upload.array(fileCount,image_url)
        uploadItem(req,res,function (err){
            if(err instanceof multer.MulterError){
                return res.status(400).send({message:err.message,errorTupe:"Multer error"})
            }
             else if(err){
                return res.status(400).send({message:err.message,errorTupe:"Normal error"})


             }
             else{
                next()
             }
        })

        
    }

}

module.exports ={uploadSingle,uploadMultiple}
