import Artifact from "../models/artifact.js";

export const createArtifactService = async ({title,content,userId}) => {
    if(!title || !content){
        throw new Error("Title and content are required");
    }

    const artifact = await Artifact.create({
        title,
        content,
        author: userId
    });

    return artifact;
};

export const getArtifactsService = async () => {
    const artifacts = await Artifact.find()
        .populate('author', 'name email')
        .sort({ createdAt: -1 });
    
    return artifacts;
};
