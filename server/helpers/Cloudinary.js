const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: "davinb0ns",
  api_key: "919754985331569",
  api_secret: "1uhCojiqSwzpjBt4V5naoAN-XtE",
});

// Configure multer for memory storage
const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    console.log("Uploading file to Cloudinary:", file);
    return result;
  } catch (error) {
    console.log("Error uploading to Cloudinary", error);
    throw error;
  }
}

// Create a multer upload middleware
const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
