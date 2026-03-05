const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("handfling the route user");
    next();
  },
  [
    (req, res, next) => {
      console.log("handfling the route user 2");
      // res.send("Response 2")
      next();
    },
    (req, res, next) => {
      console.log("Handfling the route user 3");
      // res.send("Response 3")
      next();
    },
  ],
  (req, res, next) => {
    console.log("handfling the route user 4");
    // next()
    res.send("Response 4");
    // return 'test'
  },
);

app.listen(7777, () => {
  console.log("Server is running on port 7777...");
});
