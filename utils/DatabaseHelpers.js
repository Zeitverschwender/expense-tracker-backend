const Exception = require("./Exception");
const User = require("../db/models/user");

const getUserFromId = async (token) => {
    const currUser = await User.findOne({"googleId": token});
    if (currUser == null) {
      throw new Exception(401, "User not found.")
    }
    return currUser;
}

module.exports = {
    getUserFromId,
}