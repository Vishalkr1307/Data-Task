const express = require("express");
const router = express.Router();
const Product = require("..//module/product");
const { body, validationResult } = require("express-validator");
const authinacte = require("..//middleware/authentication");
// const {uploadSingle,uploadMultiple}=require("..//middleware/upload")
const tittleChain=()=>body("tittle").notEmpty().withMessage("description is not empty")
const descriptionChain=()=>body("description").notEmpty().withMessage("description is not empty")
const tasks_statusChain=()=>body("tasks_status").notEmpty().withMessage("tasksStaus is not empty")
const tagChain=()=>body("tags").notEmpty().withMessage("tasksStaus is not empty")
const formatOfError=require("..//util/valadation")





router.post("/addTask",tittleChain(),descriptionChain(),tasks_statusChain(),tagChain(),authinacte, async (req, res) => {
  try {
    const error=validationResult(req)
    if(!error.isEmpty()){
      return res.status(400).send(formatOfError(error.array()).join(","))

    }
    const product = await Product.create(req.body);
    return res.status(200).send({product,status:"Task has added"});
  } catch (err) {
    
    return res.status(400).send("Bad request");
  }
});

router.get("/allTask",async (req,res)=>{
  try{
    const product=await Product.find().limit(5).lean().exec()
    return res.status(200).send(product)

  }
  catch(err){
    return res.status(400).send("Bad Request")
  }
})

router.get("/getTask", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit ||5;
    const skip = (page - 1) * limit;
    
    const search = req.query.search;
    const totalItem = await Product.find().countDocuments()


    if (search) {
      const product = await Product.find({ tittle: search })
        
        .lean()
        .exec();
      const searchItem = await Product.find({ tittle: search })
        
        .countDocuments();
      return res.status(200).send({ product, totalItem,searchItem });
    } else {
      const product = await Product.find().skip(skip).limit(limit).lean().exec();
      const pageItem = await Product.find().skip(skip).limit(limit).countDocuments()
      return res.status(200).send({product, totalItem,pageItem});
    }
  } catch (err) {
    return res.status(400).send("Bad request");
  }
});

router.get("/singleTask/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).lean().exec();

    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send("Bad request");
  }
});

router.put("/updateTask/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body);
    product=await Product.findById(req.params.id)


    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send("Bad request");
  }
});
router.patch("/updateTask/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body);
        product=await Product.findById(req.params.id)

    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send("Bad request");
  }
});
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send("Bad request");
  }
});

module.exports = router;
