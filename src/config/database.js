const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:qcPbKvBa2oytQfmj@namastenode.ongzm42.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
