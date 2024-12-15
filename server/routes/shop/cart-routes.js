const express = require("express");
const {
  addToCart,
  getCart,
  updateCartItemQuantity,
  removeFromCart,
} = require("../../controllers/shop/cart-controller");
const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCart);
router.put("/update-cart", updateCartItemQuantity);
router.delete("/:userId/:productId", removeFromCart);

module.exports = router;
