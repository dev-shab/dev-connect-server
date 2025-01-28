const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const router = express.Router();

router.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const toUser = await User.findById(toUserId);
    const status = req.params.status;
    if (!["interested", "ignored"].includes(status)) {
      throw new Error("Unsupported status for sending a request");
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (!toUser) {
      throw new Error("Connection request sent to invalid user");
    }
    if (existingConnectionRequest) {
      throw new Error("Connection request already exists");
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();
    if (!data) {
      throw new Error("Unexpected error occured");
    }
    return res.json({
      message: req.user.firstName + status + toUser.firstName,
      data: data,
    });
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});

module.exports = router;
