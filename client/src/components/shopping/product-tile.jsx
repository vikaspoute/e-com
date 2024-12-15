import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ShoppingCartIcon, HeartIcon } from "lucide-react";
import { useDispatch } from "react-redux";

const ShoppingProductTile = ({ product, fetchProduct, handleAddToCart }) => {
  // Calculate discount percentage if sell price exists
  const discountPercentage =
    product?.sellPrice && product?.price
      ? Math.round(((product.price - product.sellPrice) / product.price) * 100)
      : null;

  return (
    <Card className="w-full max-w-sm mx-auto group overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
      <div className="relative">
        {/* Product Image */}
        <div onClick={() => fetchProduct(product?._id)}>
          <div className="relative overflow-hidden">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Sale Badge */}
            {discountPercentage && (
              <Badge className="absolute top-2 left-2 bg-emerald-500 hover:bg-emerald-600">
                {discountPercentage}% OFF
              </Badge>
            )}

            {/* Wishlist Button */}
            <button
              className="absolute top-2 right-2 bg-white/70 rounded-full p-2 hover:bg-white/90 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Add to Wishlist"
            >
              <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
            </button>
          </div>

          {/* Product Details */}
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold line-clamp-2">
                {product?.title}
              </h2>
            </div>

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{product?.category}</span>
              <span>{product?.brand}</span>
            </div>

            {/* Pricing */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                {product?.sellPrice > 0 ? (
                  <>
                    <span className="text-lg font-bold text-primary">
                      ${product?.sellPrice.toFixed(2)}
                    </span>
                    <span className="text-sm line-through text-muted-foreground">
                      ${product?.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-primary">
                    ${product?.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </div>
        {/* Add to Cart */}
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={() =>
              handleAddToCart({ productId: product?._id, quantity: 1 })
            }
            className="w-full group flex items-center justify-center gap-2 transition-all duration-300 hover:gap-3"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShoppingProductTile;
