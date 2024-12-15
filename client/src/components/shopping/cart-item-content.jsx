import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/store/shop/cart-slice";

const UserCartItemContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function onUpdateQuantity(productId, quantity) {
    dispatch(
      updateCartItemQuantity({
        productId: productId,
        quantity: quantity,
        userId: user._id,
      })
    );
  }

  function onRemoveItem(productId) {
    dispatch(
      removeFromCart({
        productId: productId,
        userId: user._id,
      })
    );
  }

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  // Calculate total item price
  const totalItemPrice =
    (cartItem.sellPrice || cartItem.price) * cartItem.quantity;

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (cartItem.price && cartItem.sellPrice) {
      const discount =
        ((cartItem.price - cartItem.sellPrice) / cartItem.price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <Card className="w-full mb-4">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Product Image */}
          <div className="w-28 h-28 shrink-0">
            <img
              src={cartItem.image}
              alt={cartItem.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-grow space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold line-clamp-2">
                  {cartItem.name}
                </h3>

                {/* Price and Discount */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-primary font-bold">
                    {formatPrice(cartItem.sellPrice || cartItem.price)}
                  </span>
                  {calculateDiscount() > 0 && (
                    <Badge variant="destructive">
                      {calculateDiscount()}% OFF
                    </Badge>
                  )}
                </div>
                {cartItem.price !== cartItem.sellPrice && (
                  <span className="text-muted-foreground line-through text-sm">
                    {formatPrice(cartItem.price)}
                  </span>
                )}
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveItem(cartItem.productId)}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    onUpdateQuantity(cartItem.productId, cartItem.quantity - 1)
                  }
                  disabled={cartItem.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-medium">
                  {cartItem.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    onUpdateQuantity(cartItem.productId, cartItem.quantity + 1)
                  }
                  // disabled={cartItem.quantity >= (cartItem.stock || 10)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Total Item Price */}
              <div className="font-bold text-primary">
                {formatPrice(totalItemPrice)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UserCartContent = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        Your Cart ({cart?.totalItems} items)
      </h2>

      {cart?.items?.map((item) => (
        <UserCartItemContent
          key={item.productId}
          cartItem={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
        />
      ))}

      {/* Cart Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(cart?.total || 0)}
            </span>
          </div>
          <Button className="w-full mt-4" size="lg">
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export { UserCartContent, UserCartItemContent };
