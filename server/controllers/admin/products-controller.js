const { imageUploadUtil } = require("../../helpers/Cloudinary");

const handleImageUpload = async (req, res) => {
  try {
    // Validate file existence
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: "No file provided or invalid file format." });
    }

    // Convert file buffer to Base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64; // Added a comma after "base64"

    // Upload to Cloudinary or other service
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error in handleImageUpload:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred during image upload.",
    });
  }
};

module.exports = { handleImageUpload };
