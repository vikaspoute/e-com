const Product = require("../../models/Product");

const getFilterProducts = async (req, res) => {
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

module.exports = { getFilterProducts };
