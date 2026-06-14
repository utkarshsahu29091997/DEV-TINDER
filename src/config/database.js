const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.PROCESS_DB_CONNECTION_STRING);
  await mongoose.connect(process.env.PROCESS_DB_CONNECTION_STRING);
};

module.exports = connectDB;
