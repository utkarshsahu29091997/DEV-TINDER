const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:IOfpnQSuQsI1YwbY@namastenode.ongzm42.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
