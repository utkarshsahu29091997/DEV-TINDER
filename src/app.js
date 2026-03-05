const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
    throw new Error("vvbjb")
    // res.send("User data");
    // try {
    //     throw new Error("vvbjb")
    // } catch (error) {
    //     res.status(500).send("Something went wrong")
        
    // }
})
app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("Something went wrong")
    }
})

app.listen(7777, () => {
  console.log("Server is running on port 7777...");
});
