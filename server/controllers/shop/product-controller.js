const Product = require("../../models/Product");

const getFilterProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (brand.length) filters.brand = { $in: brand.split(",") };
    if (category.length) filters.category = { $in: category.split(",") };

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
        break;
    }

    console.log(filters);

    const products = await Product.find(filters).sort(sort);

    res.json({
      success: true,
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

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Fetch product details error:", error);
    res.status(500).json({
      message: "Error fetching product details",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { getFilterProducts, getProductDetails };
