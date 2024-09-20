const mongoose = require("mongoose");
require("dotenv").config();
// dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("connected to database");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
