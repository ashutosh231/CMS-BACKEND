import Like from "../models/likes.js";

export const toggleLikeService = async (artifactId, userId) => {
    // Check if the like already exists
    const existingLike = await Like.findOne({ artifact: artifactId, user: userId });

    if (existingLike) {
        // If it exists, remove the like (unlike)
        await Like.deleteOne({ _id: existingLike._id });
        return { liked: false, message: "Artifact unliked" };
    } else {
        // If it doesn't exist, create a new like
        await Like.create({ artifact: artifactId, user: userId });
        return { liked: true, message: "Artifact liked" };
    }
};