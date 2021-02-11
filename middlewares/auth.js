const jwt = require("jsonwebtoken");
const Exception = require("../utils/Exception");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if(token == null) return next(new Exception(401, "There is no token sent."));
  jwt.verify(token, process.env.JWT_SECRET,(err,user) => {
    if (err) return next(new Exception(403, "Token no longer valid."));
    req.user = user;
    next();
  })

}
module.exports = {
  authenticateToken,
}