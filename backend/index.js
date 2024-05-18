import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import databaseConnection from './config/db.js';
import userRoute from './routes/userRoute.js'
import tweetRoute from './routes/tweetRoute.js'
import cors from 'cors'
// const express = require('express');
// const dotenv = require('dotenv');
// const {databaseConnection} = require('../config/db.js');


const app=express()


dotenv.config({
    path:'.env'
})

    // mongo connection
    databaseConnection()

    //sys middleware
    app.use(express.json())
    app.use(express.urlencoded({
        extended:true
    }))

    //custom middleware
    app.use(cookieParser())
    
const corsOptions={
    origin: "http://localhost:5173/",
    credentials: true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173/");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

    //api

    app.use("/api/v1/user",userRoute)
    app.use("/api/v1/tweet",tweetRoute)
    app.get('/',(req,res)=>{
        res.status(200).json({
            msg:"coming from backend"
        })
    })


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on Port ${process.env.PORT}`);
    console.log(`http://localhost:4000`);
})