const express = require("express");

const app = express();



app.use('/test', (req, res) => {
    res.send("Hello, World!");
})

app.use('/hello', (req, res) => {
    res.send("Hello hello Hello")
})

app.use('/', (req, res) => {
    res.send("hello from home page");
})

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
