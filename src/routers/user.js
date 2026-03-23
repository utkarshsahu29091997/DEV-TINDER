const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl about skills";

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
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUserId.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      data,
      message: "Connections fetched successfuully",
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connections.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUserId } },
      ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)

    res.json({
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;
