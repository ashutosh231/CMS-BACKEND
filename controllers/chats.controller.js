import { getChatsByThreadService,sendChatService } from "../services/chat.service.js";

export const getChatsByThread = async (req, res) => {
    try {
        const { threadId } = req.params;
        const chats = await getChatsByThreadService(threadId);
        res.status(200).json({ success: true, chats });
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ success: false, message: "Failed to fetch chats" });
    }
};
//database polling?ans:-

export const sendChat = async (req, res) => {
    try{
        const senderId=req.user.id;//from auth middleware
        const {receiverId,message}=req.body;

        const chat=await sendChatService(
            {senderId: senderId,
                receiverId:receiverId,
                message:message
            });

        res.status(201).json({ success: true, chat });
    }catch(error){
        console.error("Error sending chat:", error);
        res.status(500).json({ success: false, message: error.message || "Failed to send chat" });
    }
};