const axios = require("axios");
const jwt = require("jsonwebtoken")
const {OAuth2Client} = require('google-auth-library');
const Exception = require("../../utils/Exception.js");


const getUserConsent = (req,res) =>{
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:8000/auth/google/callback",
  );
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
  });
  res.redirect(authorizeUrl);
}

const loginUser = (req,res)=>{
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:8000/auth/google/callback",
  );
  oAuth2Client.getToken(req.query.code, async (err, google_token)=>{
    if(err) console.log(err);
    else{
      const googleUser = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${google_token.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${google_token.id_token}`,
        },
      })
      .then((res) => res.data)
      .catch((e) =>
        {
          console.log(e.message);
          console.log("Failed to fetch user");
        }
      );
      const token = jwt.sign(googleUser, process.env.JWT_SECRET);
      res.cookie("token",token,{
        maxAge: 1000*60*30,
        httpOnly: true,
      });
      res.redirect("http://localhost:8000/loggedin")
    }

  })
}


module.exports = {
    getUserConsent,
    loginUser
}