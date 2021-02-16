
const oAuth2GetToken = (req, oAuth2Client) => {
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(req.query.code, (err, google_token) => {
      if (err) return reject(err);
      resolve(google_token);
    });
  });
};

module.exports = {
  oAuth2GetToken,
};
