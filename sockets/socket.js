import { sendChatService } from "../services/chat.service.js";
import { Server } from "socket.io";
import http from "http";
export const registerSocketHandlers = (io) => {

    //In-memory store for connected users
    const connectedUsers = new Map();//userId -> socketId

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
        
        //USER ONLINE EVENT
        socket.on("user-online", (userId) => {
            connectedUsers.set(userId, socket.id);
            console.log(`User ${userId} is online with socket ID ${socket.id}`);
        });
    
        // Handle incoming chat messages
        socket.on("send-message", async(data) => {
            const {senderId, receiverId, message} = data;
            try {
                if(!senderId || !receiverId || !message) {
                    throw new Error("Missing required fields");
                }
                //save chat to database
                const chat = await sendChatService({senderId, receiverId, message});
                
                // Emit message to receiver if online
                const receiverSocketId = connectedUsers.get(receiverId);
                if(receiverSocketId) {
                    io.to(receiverSocketId).emit("receive-message", chat);
                }
                socket.emit("message-sent", chat);//acknowledgment to sender
            } catch(error) {
                console.error("Error sending message:", error);
                socket.emit("error", { message: error.message });
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
            // Remove user from connectedUsers
            for (const [userId, socketId] of connectedUsers.entries()) {
                if (socketId === socket.id) {
                    connectedUsers.delete(userId);
                    console.log(`User ${userId} went offline`);
                    break;
                }
            }
        });
    });
};