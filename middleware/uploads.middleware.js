import multer from 'multer';// Middleware for handling file uploads
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({// Define where and how to store uploaded files
    destination: (req, file, cb) => {// Set the destination directory for uploaded files
        cb(null, uploadDir);// Use the uploads directory,cb?ans:- The cb parameter is a callback function provided by multer. It is used to signal when the destination directory has been set. The first argument is for error handling (null in this case, indicating no error), and the second argument specifies the directory where the file should be stored (uploadDir).
    },
    filename: (req, file, cb) => {// Generate a unique filename for each uploaded file
        const uniqueName =// Create a unique name using timestamp and random number
            Date.now() + '-' + Math.round(Math.random() * 1e9);// Get the original file extension

        const extension = path.extname(file.originalname);// Combine unique name with original file extension,path.extname?ans:- The path.extname() function is used to extract the file extension from the original filename. This ensures that the uploaded file retains its original format (e.g., .jpg, .pdf) while being stored with a unique name to prevent overwriting existing files.

        cb(null, uniqueName + extension);// Save the file with the new unique name
    }
});

// File type validation
const fileFilter = (req, file, cb) => {// Allow images and PDFs only
    if (
        file.mimetype.startsWith('image/') ||// Allow all image types
        file.mimetype === 'application/pdf'// Allow PDFs
    ) {
        cb(null, true);// Accept the file
    } else {
        cb(new Error('Invalid file type. Only images and PDFs allowed.'), false);// Reject the file
    }
};

// Export multer instance
export const upload = multer({// Configure multer with storage, file filter, and size limits
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});
