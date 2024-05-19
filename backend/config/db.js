import mongoose from "mongoose";
import dotenv from "dotenv";
// const mongoose = require("mongoose");
// const dotenv = require('dotenv');
dotenv.config({
    path:'../config/.env'
})

const databaseConnection=()=>{
    mongoose.connect("mongodb+srv://krishnaalas:w70qYdUpivNwCRYl@cluster0.wxdbddh.mongodb.net/",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(err);
    })
}

export default databaseConnection



