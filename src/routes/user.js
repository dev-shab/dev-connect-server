const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const router = express.Router();

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "gender",
  "about",
  "skills",
];

router.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    if (!connectionRequests) {
      throw new Error("Error while fetching connection ");
    }
    return res.status(200).json({ connectionRequests });
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});

router.get("/connections/accepted", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionsAccepted = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
      status: "accepted",
    }).populate("fromUserId toUserId", USER_SAFE_DATA);
    if (!connectionsAccepted) {
      throw new Error("Error while fetching connection ");
    }
    const data = connectionsAccepted.map((connection) =>
      connection.fromUserId._id.toString() === loggedInUser._id.toString()
        ? connection.toUserId
        : connection.fromUserId
    );
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});

module.exports = router;
