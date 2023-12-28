const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, process.env.PRIVATE_KEY, (errr, decoded) => {
      if (errr) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

module.exports = async (req, res, next) => {
  try {
    
    if (!req?.headers?.authorization)
      return res.status(400).send("please provide authorization token");
    const bearToken = req?.headers?.authorization;
    if (!bearToken.startsWith("Bearer"))
      return res.status(400).send("please provide bearer token");
    const token = bearToken.split(" ")[1];
    const user=await verifyToken(token)

    req.user=user.user
    next()


  } catch (err) {
    return res.status(400).send("bad request occurred");
  }
};
