const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.userId;
      const status = req.params.status;
      const fromUserId = req.user._id;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid status type: " + status);
      }

      const toUserData = await User.findById(toUserId);

      if(!toUserData) {
        return res.status(400).json({message: "User not found"});
      }

      const connectRequestExists = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (connectRequestExists) {
        return res
          .status(400)
          .send({ message: `Connection Request Already Exists` });
      }

      const connnectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connnectionRequest.save();

      const { firstName } = toUserData;

      res.json({
        message: `${req.user.firstName} ${status} in ${firstName}`,
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  },
);

module.exports = requestRouter;
