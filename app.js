const express = require('express')
const mongoose= require("mongoose")
const cors= require("cors")
const app= express();

app.use(express.json());
app.use(cors());


//user route

// const userRoute = require("./route/user.route")

// app.use("/api/v1/user",userRoute);

module.exports = app;