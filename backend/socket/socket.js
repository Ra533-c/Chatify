import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express()

const server = http.createServer(app);

// Allow both localhost (development) and production URLs
const allowedOrigins = [
    "http://localhost:5173",
    "https://chatify-azure-omega.vercel.app"
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {};  //{userId -> socketId}

io.on('connection', (socket) => {
    console.log("user connected with Socket.id :-", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
        console.log("userSocketMap:-", userSocketMap);
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
        console.log("user disconnected with Socket.id :-", socket.id);
    });
});

export { app, server, io };