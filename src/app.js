const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Sachin",
    lastName: "Tendulkar",
    email: "sachin@tendulkar.com",
    password: "ST@123",
  };

  try {
    const user = new User(userObj);
    await user.save();
    return res.send("User added successfully");
  } catch {
    return res.status(400).send("Error saving the user " + err?.message);
  }
});

connectDb()
  .then(() => {
    console.log("DB connection successfull");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch(() => {
    console.log("DB connect failed");
  });
