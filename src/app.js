const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello, World!");
});

app.get("/user", (req, res) => {
  res.send({
    firstname: "Utkarsh",
    lastname: "Sahu",
  });
});

app.post('/user', (req, res) => {
    console.log('User added');
    res.send("Data saved successfully to DB!");
})

app.delete('/user', (req, res) => {
    res.send("User deleted successfully from DB!");
})

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
