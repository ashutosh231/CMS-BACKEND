import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    Participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    lastMessages:{
            type: String
        },
    lastMessagesAt: {
            type: Date
        }
}, { timestamps: true });

const Thread = mongoose.model("Thread", threadSchema);

export default Thread;