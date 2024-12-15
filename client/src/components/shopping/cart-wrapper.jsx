import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { UserCartItemContent } from "./cart-item-content";

const UserCartWrapper = ({ cart }) => {

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cart && cart?.items && cart?.items?.length > 0
          ? cart?.items.map((item) => (
              <UserCartItemContent key={item._id} cartItem={item} />
            ))
          : null}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">{formatPrice(cart?.total)}</span>
        </div>
      </div>
      <Button className="w-full mt-5">
        Checkout
        <ShoppingCart />
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
