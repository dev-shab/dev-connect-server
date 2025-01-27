const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decodedToken = await jwt.verify(token, "DEV@connect$4488");
    const { _id } = decodedToken;
    const foundUser = await User.findById(_id);
    if (!foundUser) {
      throw new Error("User not found");
    }
    req.user = foundUser;
    next();
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
};

module.exports = {
  userAuth,
};
