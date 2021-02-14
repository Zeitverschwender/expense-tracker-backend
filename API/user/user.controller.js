const DatabaseHelpers =  require("../../utils/DatabaseHelpers");

const getGooglePhoto = async (req, res) => {
	const currUser =  await DatabaseHelpers.getUserFromId(req.user);
  res.send(currUser.profile_picture_url);
}

const getUsername = async (req, res) => {
	const currUser =  await DatabaseHelpers.getUserFromId(req.user);
	res.send(currUser.name);
}

module.exports = {
	getGooglePhoto,
	getUsername,
}