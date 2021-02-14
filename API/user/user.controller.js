const DatabaseHelpers =  require("../../utils/DatabaseHelpers");
const Exception = require('../../utils/Exception');

const getGooglePhoto = async (req, res) => {
	try{
		const currUser =  await DatabaseHelpers.getUserFromId(req.user);
		res.send(currUser.profile_picture_url);
	} catch (e){
		next(new Exception(400, e.message))
	}
}

const getUsername = async (req, res) => {
	try{
		const currUser =  await DatabaseHelpers.getUserFromId(req.user);
		res.send(currUser.name);
	} catch(e){
		next(new Exception(400, e.message))
	}
}

module.exports = {
	getGooglePhoto,
	getUsername,
}