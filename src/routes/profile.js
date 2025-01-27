const express = require("express");
const { userAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", userAuth, async (req, res) => {
  try {
    return res.status(200).send(req.user);
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});

module.exports = router;
