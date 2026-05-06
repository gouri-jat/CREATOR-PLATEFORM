require("dotenv").config();
const express = require("express");
const app = require("./app"); 
const connectDB = require("./db");

const PORT = process.env.PORT || 5000;

connectDB.then(()=>{
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
});
});