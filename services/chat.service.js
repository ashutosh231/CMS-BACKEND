import Chat from "../models/chat.js";
import Thread from "../models/thread.js";

export const getChatsByThreadService = async (threadId) => {
    return await Chat.find({ thread: threadId }).populate("sender", "name email").sort({ createdAt: 1 });//oldest first
};

export const sendChatService = async ({senderId,receiverId,message}) => {
    //ensure thread exists between sender and receiver
    const thread= await findorCreateThreadService(senderId,receiverId);

    //create Chat
    const chat = await Chat.create({
        thread: thread._id,
        sender: senderId,
        message: message
    });

    //update last message in thread
    thread.lastMessages=message;
    thread.lastMessagesAt=new Date();
    await thread.save();//

    return chat;
};

export const findorCreateThreadService = async (userId1, userId2) => {

    const participants = [userId1, userId2].sort(); //sort to ensure consistent order
    
    let threads=await Thread.findOne({//find thread with both participants
        Participants: { $all: participants},
        $expr: { $eq: [{ $size: "$Participants" }, 2] }
    });

    if(!threads){//if not found create new thread
        threads=await Thread.create({ Participants: participants });
    }

    return threads;
};

