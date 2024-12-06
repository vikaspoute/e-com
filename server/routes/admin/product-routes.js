const express = require("express");
const { upload } = require("../../helpers/cloudinary");
const {
  handleImageUpload,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
} = require("../../controllers/admin/product-controller");

const router = express.Router();

router.post("/upload-image", upload, handleImageUpload);
router.post("/add", createProduct);
router.put("/edit/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/product/:id", getProductById);
router.post("/get", getAllProducts);

module.exports = router;
