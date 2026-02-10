import { toggleLikeService } from "../services/likes.service.js";

export const toggleLike = async (req, res) => {
    try {
        const { artifactId } = req.params;
        const userId = req.user.id;

        // Call the service to toggle like
        const result = await toggleLikeService(artifactId, userId);
        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};