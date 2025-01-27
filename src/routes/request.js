const express = require("express");
const { userAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/", userAuth, async (req, res) => {
  return res.status(200).send(req.user.firstName + " sent a request");
});

module.exports = router;
