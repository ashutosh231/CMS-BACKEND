import Artifact from "../models/artifact.js";

export const createArtifactService = async ({title,content,userId}) => {
    if(!title || !content){
        throw new Error("Title and content are required");
    }
    let mediaUrl = null;
    if(filePath){
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            folder: "artifacts"
        });
        mediaUrl = uploadResult.secure_url;

        //delete local file after upload
        fs.unlinkSync(filePath);
    }
    console.log("Media url before save:", mediaUrl);
    const artifact = await Artifact.create({
        title,
        content,
        author: userId,
        media: mediaUrl || null
    });

    return artifact;
};

export const getArtifactsService = async () => {
    const artifacts = await Artifact.find()
        .populate('author', 'name email')
        .sort({ createdAt: -1 });
    
    return artifacts;
};
