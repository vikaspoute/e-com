const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 120000,
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
}).single("file");

async function imageUploadUtil(dataUri) {
  try {
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      resource_type: "auto",
      transformation: { width: 800, height: 800, crop: "limit" },
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Detailed Cloudinary Error:", error);
  }
}

module.exports = { upload, imageUploadUtil };
