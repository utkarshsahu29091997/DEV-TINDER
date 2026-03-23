const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAVE_DATA = "firstName lastName photoUrl about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUserId,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoUrl about skills");

    res.json({
      messsage: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const connections = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: loggedInUserId,
          status: "accepted",
        },
        {
          toUserId: loggedInUserId,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAVE_DATA)
      .populate("toUserId", USER_SAVE_DATA);

    const data = connections.map((row) => {
        if(row.fromUserId._id.toString() === loggedInUserId.toString()) {
            return row.toUserId
        }
        return row.fromUserId
    });

    res.json({
      data,
      message: "Connections fetched successfuully",
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;
