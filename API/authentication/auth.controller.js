const axios = require("axios");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../../db/models/user");
const Token = require("../../db/models/token");
const url = require("url").URL;
const { oAuth2GetToken } = require("../../utils/Oauth2LoginHelper");

const GOOGLE_CALLBACK_ROUTE = "auth/google/callback";

const getCallBackURL = (req) => {
  const baseURL = new URL(req.protocol + "://" + req.get("host")).href;
  return baseURL + GOOGLE_CALLBACK_ROUTE;
};

const getUserConsent = (req, res) => {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    getCallBackURL(req)
  );
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile",
  });
  res.redirect(authorizeUrl);
};

const loginUser = async (req, res) => {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    getCallBackURL(req)
  );
  try {
    const google_token = await oAuth2GetToken(req, oAuth2Client);
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${google_token.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${google_token.id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((e) => {
        console.log(e.message);
        console.log("Failed to fetch user");
      });
    const newUser = {
      googleId: googleUser.id,
      name: googleUser.name,
      profile_picture_url: googleUser.picture,
    };
    let user = await User.findOne({ googleId: googleUser.id });
    if (!user) {
      user = await User.create(newUser);
    }
    const token = jwt.sign(user.googleId, process.env.JWT_SECRET);
    const maxAge = 1000 * 60 * 30;
    res.cookie("token", token, {
      maxAge,
      httpOnly: true,
    });
    res.cookie("isLoggedIn", "", {
      maxAge,
      httpOnly: false,
    });
    res.redirect(process.env.FRONTEND_URL);
    const dbToken = await Token.findById(token);
    if (dbToken == null) {
      await Token.create({ _id: token });
    }
  } catch (err) {
    console.error(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await Token.findOneAndDelete({ _id: req.cookies.token });
    res.cookie("token", "", { maxAge: "0" });
    res.status(204).send("");
  } catch (e) {
    return next(e);
  }
};
module.exports = {
  getUserConsent,
  loginUser,
  logoutUser,
};
