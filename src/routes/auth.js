const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { password, firstName, lastName, email } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 3600000),
    });
    return res.status(200).send("User added successfully");
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    validateLoginData;
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await foundUser.validatePassword(password);
    if (isPasswordValid) {
      const token = await foundUser.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 3600000),
      });
      return res.status(200).send(foundUser);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});
router.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  return res.status(200).send("User Logged out successfully");
});

module.exports = router;
