import React, { useEffect } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";

const ShoppingProductTile = ({ product }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.sellPrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="tex-sm text-muted-foreground">
                {product?.category}
              </span>
              <span className="tex-sm text-muted-foreground">
                {product?.brand}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.sellPrice > 0 ? "line-through" : ""
                } tex-lg font-semibold text-primary`}
              >
                {product?.price}
              </span>
              {product?.sellPrice > 0 ? (
                <span className="tex-lg font-semibold text-primary">
                  {product?.sellPrice}
                </span>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add to cart</Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ShoppingProductTile;
