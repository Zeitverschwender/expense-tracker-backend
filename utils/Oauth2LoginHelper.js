const { OAuth2Client } = require("google-auth-library");

const outh2GetToken = (oAuth2Client) => {
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(req.query.code, (err, google_token) => {
      if (err) return reject(err);
      resolve(google_token);
    });
  });
};

module.exports = {
  outh2GetToken,
};
