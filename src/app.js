const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.send("User added successfully");
  } catch {
    return res.status(400).send("Error saving the user " + err?.message);
  }
});
app.get("/user", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
});
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    res.status(200).send("User Update successfull");
  } catch (err) {
    res.status(400).send("Something went wrong!");
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
