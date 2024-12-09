import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AdminProductTile = ({
  product,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  setFormData,
  handelDelete,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto rounded-2xl">
      <div>
        <div className="relative p-2">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-xl"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.sellPrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {product?.price}
            </span>
            {product?.sellPrice > 0 ? (
              <span className="text-lg font-bold">{product?.sellPrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handelDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
