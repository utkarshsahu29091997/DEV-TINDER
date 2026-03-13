const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // req.body validation
    validateSignUpData(req);

    // password encryption
    const { firstName, lastName, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error saving the users:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // req.body validation
    validateLoginData(req);

    const user = await User.find({ email: email });
    if (user.length === 0) {
      throw new Error("Invalid credentials");
    }
    const { password: storedHashedPassword } = user[0];

    // password decryption
    const decryptedPasswordCheck = await bcrypt.compare(
      password,
      storedHashedPassword,
    );
    if (!decryptedPasswordCheck) {
      throw new Error("Invalid credentials");
    }
    // create jwt token
    const token = jwt.sign({ _id: user[0]._id }, "DEV@Tinder$790", {
      expiresIn: "1d",
    });
    // set the token inside cookie
    res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
    });

    res.send("Login successful");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  console.log("sending connection request");

  res.send("Connection request sent" + req.user.firstName);
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
