const Expense = require("../../db/models/user");
const Exception = require('../../utils/Exception');

const getGooglePhoto = (req, res) => {
  res.send(req.uesr.photo);
}

const getUserPhoto = (req, res) => {
	res.send(req.user.image);
}