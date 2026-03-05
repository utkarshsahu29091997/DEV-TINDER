const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use('/admin', adminAuth)

// app.use('/user', userAuth)

app.post('/user/login', (req, res, next) => {
    res.send("User Logged In")
})

app.get('/user/getData', userAuth, (req, res, next) => {
    res.send("Data Sent")
})

app.get('/admin/getAllData', (req, res, next) => {
    res.send("All Data Sent")
})

app.get('/admin/delete', (req, res, next) => {
    res.send("Data Deleted")
})



app.listen(7777, () => {
  console.log("Server is running on port 7777...");
});
