const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

// Image Upload Handler
const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const mimeType = req.file.mimetype;
    const dataUri = `data:${mimeType};base64,${b64}`;

    try {
      const result = await imageUploadUtil(dataUri);
      return res.json({
        message: "Image uploaded successfully",
        success: true,
        result,
      });
    } catch (uploadError) {
      return res.status(500).json({
        message: "Image upload failed",
        success: false,
        error: uploadError.message,
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// Create New Product
const createProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      sellPrice,
      totalStock,
    } = req.body;

    // Validate required fields
    if (!title || !price || !totalStock) {
      return res.status(400).json({
        message: "Title, price, and total stock are required",
        success: false,
      });
    }

    // Create new product
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      sellPrice: sellPrice || price,
      totalStock,
    });

    // Save product
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      success: true,
      product: savedProduct,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({
      message: "Error creating product",
      success: false,
      error: error.message,
    });
  }
};

// Fetch All Products
const getAllProducts = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.brand) filter.brand = req.query.brand;

    // Sorting
    const sort = {};
    if (req.query.sortBy) {
      const [field, order] = req.query.sortBy.split(":");
      sort[field] = order === "desc" ? -1 : 1;
    }

    // Fetch products
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Total count for pagination
    const totalProducts = await Product.countDocuments(filter);

    res.json({
      success: true,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({
      message: "Error fetching products",
      success: false,
      error: error.message,
    });
  }
};

// Get Single Product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        success: false,
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({
      message: "Error retrieving product",
      success: false,
      error: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        success: false,
      });
    }

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      sellPrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.sellPrice = sellPrice || findProduct.sellPrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    const updatedProduct = await findProduct.save();

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      message: "Error updating product",
      success: false,
      error: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        success: false,
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.json({
      message: "Product deleted successfully",
      success: true,
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      message: "Error deleting product",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  handleImageUpload,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
