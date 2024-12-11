const express = require("express");
const {
  getFilterProducts,
} = require("../../controllers/shop/product-controller");

const router = express.Router();

router.post("/get", getFilterProducts);

module.exports = router;
