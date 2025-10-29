const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connection Successfull");
  } catch (error) {
    console.log("DB Connection Failed");
    process.exit(1);
  }
};

module.exports = connectDB;
