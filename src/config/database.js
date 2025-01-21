const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://dev-shab:shab1998@cluster0.lccu5fg.mongodb.net/dev_connect"
  );
};

module.exports = connectDb;
