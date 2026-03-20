const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  console.log("sending connection request");

  res.send("Connection request sent" + req.user.firstName);
});

module.exports = requestRouter;
