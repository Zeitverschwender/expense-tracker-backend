const getGooglePhoto = (req, res) => {
  res.send(req.user.photo);
}

const getUsername = (req, res) => {
	res.send(req.user.name);
}

module.exports = {
	getGooglePhoto,
	getUsername,
}