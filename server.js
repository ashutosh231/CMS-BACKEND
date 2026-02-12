import dotenv from "dotenv";
dotenv.config();
import cloudinary from "./config/cloudinary.js";
import app from "./app.js";
import connectDB from "./config/db.js";
import { testing } from "./cron/testing.js";
import { verifyMail } from "./config/mail.js";
import { autoPublishDrafts } from "./cron/autoPublishDrafts.js";
import { Server } from "socket.io";
import http from "http";
import { registerSocketHandlers } from "./sockets/socket.js";
const PORT = process.env.PORT || 5000;

connectDB();
verifyMail();

const server = http.createServer(app);// Create HTTP server and pass the Express
const io = new Server(server,{
    cors: {
        origin: "*", // Allow all origins for testing, adjust in production
        methods: ["GET", "POST"],
        credentials: true
    }
});// Initialize Socket.IO with the HTTP server  

registerSocketHandlers(io);//

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  //testing();
  autoPublishDrafts();
});