const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777...");
    });
  })
  .catch((err) => {
    console.log("database connection failed", err);
  });
