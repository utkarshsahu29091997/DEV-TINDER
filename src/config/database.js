const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:XtjfXX21y6IUJ7W9@namastenode.ongzm42.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
