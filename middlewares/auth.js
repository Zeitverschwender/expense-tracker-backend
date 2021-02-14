const jwt = require("jsonwebtoken");
const Exception = require("../utils/Exception");
const Token = require("../db/models/token");

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;
  if(token == null) return next(new Exception(401, "There is no token sent."));
  const tokenDocument =  await Token.findById(token);
  if(tokenDocument == null){
    return next(new Exception(403, "Token has expired."));
  }
  jwt.verify(token, process.env.JWT_SECRET,(err,user) => {
    if (err) return next(new Exception(403, "Token no longer valid."));
    req.user = user;
    next();
  })

}
module.exports = {
  authenticateToken,
}