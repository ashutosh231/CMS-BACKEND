import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });//to automatically add createdAt and updatedAt fields

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;