// const express = require('express');
import express from "express";
import dns from "dns";
// Force Node.js to use Google DNS to resolve MongoDB SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

import dotenv from "dotenv"
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server, io } from "./socket/socket.js";
import passport from './config/passport.js';    // Passport configuration
import authRoute from './routes/authRoute.js';  // Auth routes

//path
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './backend/.env' });
connectDB();
// Middleware to parse JSON obj( request body) -> JS obj 
app.set('trust proxy', 1); // fix for Google OAuth http/https mismatch

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Dynamic Origin
    credentials: true //allow credentials
}

app.use(cors(corsOptions))
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello i'm here!");
});

//routes=>
app.use('/api/v1/user/auth', authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRouter);

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
});