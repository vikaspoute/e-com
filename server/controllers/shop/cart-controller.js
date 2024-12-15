const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Helper function for populating cart items
const populateCartItems = async (cart) => {
  if (!cart) return null;

  await cart.populate({
    path: "items.productId",
    select: "name title image price sellPrice stock",
  });

  // Remove items with deleted products
  const validItems = cart.items.filter((item) => item.productId);
  if (validItems.length < cart.items.length) {
    cart.items = validItems;
    await cart.save();
  }

  // Transform cart items for response
  const transformedItems = validItems.map((item) => ({
    productId: item.productId._id,
    name: item.productId.name || item.productId.title,
    image: item.productId.image,
    price: item.productId.price,
    sellPrice: item.productId.sellPrice,
    quantity: item.quantity,
    stock: item.productId.stock || 0,
  }));

  // Calculate total and total items
  const total = transformedItems.reduce(
    (sum, item) => sum + (item.sellPrice || item.price) * item.quantity,
    0
  );

  const totalItems = transformedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return {
    ...cart.toObject(),
    items: transformedItems,
    total,
    totalItems,
  };
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, userId } = req.body;

    // Validate input
    if (!productId || !userId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid input parameters",
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Find existing item in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Update or add item
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Save cart
    await cart.save();

    // Populate and transform cart
    const populatedCart = await populateCartItems(cart);

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId, userId } = req.params;

    // Validate input
    if (!productId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid input parameters",
      });
    }

    // Find cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Save cart
    await cart.save();

    // Populate and transform cart
    const populatedCart = await populateCartItems(cart);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};

// Update cart item quantity
const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;

    // Validate input
    if (!productId || !userId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Invalid input parameters",
      });
    }

    // Find cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find item index
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Check if item exists
    if (existingItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Remove item if quantity is zero or negative
    if (quantity <= 0) {
      cart.items.splice(existingItemIndex, 1);
    } else {
      cart.items[existingItemIndex].quantity = quantity;
    }

    // Save cart
    await cart.save();

    // Populate and transform cart
    const populatedCart = await populateCartItems(cart);

    res.status(200).json({
      success: true,
      message: "Cart item quantity updated",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart item quantity",
      error: error.message,
    });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Populate and transform cart
    const populatedCart = await populateCartItems(cart);

    res.status(200).json({
      success: true,
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find and clear cart
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Populate and transform cart
    const populatedCart = await populateCartItems(cart);

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getCart,
  clearCart,
};
