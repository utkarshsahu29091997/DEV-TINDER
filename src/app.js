const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello, World!");
});

app.get("/user/:userid/:name/:password", (req, res) => {
    console.log({...req.params});
    
  res.send({
    firstname: "Utkarsh",
    lastname: "Sahu",
  });
});

app.listen(7777, () => {
  console.log("Server is running on port 7777...");
});
