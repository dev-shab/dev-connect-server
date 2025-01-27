const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");

const router = express.Router();

router.get("/view", userAuth, async (req, res) => {
  try {
    return res.status(200).send(req.user);
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});

router.patch("/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    return res
      .status(200)
      .json({
        message: `${loggedInUser.firstName}, your profile was updated successfully`,
        data: loggedInUser,
      });
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});

module.exports = router;
