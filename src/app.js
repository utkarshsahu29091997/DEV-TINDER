const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const validator = require("validator");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
//   const { photoUrl } = user;
  try {
    // if (!validator.isURL(photoUrl)) {
    //   throw new Error("Photo URL is not valid");
    // }
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error saving the users:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  //   try {
  //     const users = await User.findById({_id: '69aaf0f8d2e83a6bc70cffe8'})
  //     res.send(users)
  //   } catch (error) {
  //     res.status(400).send("Something went wrong: " + err.message)
  //   }
  // try {
  //     const user = await User.findOne()
  //     if(!user) {
  //         res.status(404).send("user not found")
  //     }
  //     res.send(user)
  // } catch(err) {
  //     res.status(400).send("Something went wrong: " + err.message)
  // }
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    }
    res.send(users[0]);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    console.log("users", users);
    const usersList = users.map((user) => user.firstName + " " + user.lastName);
    res.send(usersList);
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).send("user not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// app.delete("/user/:email", async (req, res) => {
//     const userEmail = req.params.email
//     try {
//         const deletedUser = await User.deleteOne({email: userEmail})
//         console.log('deletedUser', deletedUser)
//         res.send(deletedUser)
//     } catch (err) {
//         res.status(400).send("Something went wrong: " + err.message)
//     }
// })

app.put("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  //   const email = req.body.email;
  //   const data = req.body;
  //   try {
  //     const updatedUser = await User.findOneAndUpdate({ email: email }, data, {
  //       runValidators: true,
  //     });
  //     res.send("user updated successfully");
  //   } catch (err) {
  //     res.status(400).send("Something went wrong: " + err.message);
  //   }
  //   const userId = req.body.userId;
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["about", "gender", "photoUrl", "age", "skills"];
    const isUpdatedAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key),
    );
    console.log("isUpdatedAllowed", isUpdatedAllowed);
    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777...");
    });
  })
  .catch((err) => {
    console.log("database connection failed");
  });
