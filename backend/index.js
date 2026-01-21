// const express = require('express');
import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";

//path
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({});
connectDB();

const app = express();

// Middleware to parse JSON obj( request body) -> JS obj 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello i'm here!");
});

//routes=>
app.use("/api/v1/user", userRoute);

//localHost=>
//http:localhost:3000/api/v1/user/register

app.listen(port, () => console.log(`Server running on port ${port}`));
