const express = require("express");
const connectDb = require("./config/database");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
    return res.send("User added successfully");
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});
app.post("/login", async (req, res) => {
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
      return res.status(200).send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});
app.get("/profile", userAuth, async (req, res) => {
  try {
    return res.status(200).send(req.user);
  } catch (err) {
    return res.status(400).send("ERROR : " + err?.message);
  }
});
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  res.status(200).send(req.user.firstName + " sent a request");
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
