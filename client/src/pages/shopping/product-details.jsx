import React, { useState, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Box,
  Tag,
  Minus,
  Plus,
  Star,
  MessageCircle,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "@/store/product-slice";

const ProductDetailsSheet = ({ open, setOpen, product, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      rating: 4,
      date: "2024-05-15",
      text: "Incredible sound quality! The noise cancellation is top-notch. I use these for work and travel, and they're amazing.",
    },
    {
      id: 2,
      name: "Sarah Smith",
      rating: 5,
      date: "2024-05-10",
      text: "Best headphones I've ever owned. Battery life is amazing! The comfort is unbelievable, and I can wear them for hours without any discomfort.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 3,
      date: "2024-04-25",
      text: "Good headphones, but a bit expensive. Sound is clear, but I expected more features at this price point.",
    },
    {
      id: 4,
      name: "Emily Brown",
      rating: 5,
      date: "2024-05-02",
      text: "Perfect for work and travel. Noise cancellation works perfectly. The bluetooth connectivity is seamless and the battery lasts forever!",
    },
    {
      id: 5,
      name: "David Wilson",
      rating: 4,
      date: "2024-04-18",
      text: "Comfortable design, great for long listening sessions. The sound quality is exceptional, and the build feels premium.",
    },
    {
      id: 6,
      name: "Rachel Green",
      rating: 5,
      date: "2024-05-20",
      text: "Absolutely love these headphones! The sound is crystal clear, and the noise cancellation is impressive. Highly recommend!",
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    text: "",
  });

  const dispatch = useDispatch();

  // Price formatting function
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price || 0);
  };

  // Pricing details calculation
  const pricingDetails = useMemo(() => {
    const sellPrice = product?.sellPrice || product?.price || 0;
    const originalPrice = product?.price || 0;
    const discount =
      originalPrice > 0 && sellPrice > 0
        ? ((originalPrice - sellPrice) / originalPrice) * 100
        : 0;

    return {
      sellPrice,
      originalPrice,
      discountPercentage: Math.round(discount),
      hasDiscount: discount > 0,
    };
  }, [product]);

  // Quantity change handler
  const handleQuantityChange = (newQuantity) => {
    const clampedQuantity = Math.min(
      Math.max(newQuantity, 1),
      product?.totalStock || 1000
    );
    setQuantity(clampedQuantity);
  };

  // Review submission handler
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text || newReview.rating === 0) {
      alert("Please fill in all review details");
      return;
    }

    const submittedReview = {
      ...newReview,
      id: reviews.length + 1,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([submittedReview, ...reviews]);
    setNewReview({ name: "", rating: 0, text: "" });
  };

  // Star rendering function
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }`}
      />
    ));
  };

  // Total price calculation
  const totalPrice = pricingDetails.sellPrice * quantity;

  function handleSheetClose() {
    setOpen(false);
    dispatch(setCurrentProduct());
  }

  return (
    <Sheet open={open} onOpenChange={handleSheetClose}>
      <SheetContent side="right" className="p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {/* Product Image */}
            <div className="relative h-[250px] overflow-hidden p-4">
              <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Product Details Container */}
            <div className="p-6 space-y-4">
              {/* Title and Badges */}
              <div>
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold text-foreground text-start">
                    {product?.title}
                  </SheetTitle>
                </SheetHeader>

                <div className="flex items-center space-x-2 mt-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <Box size={16} />
                    {product?.category}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <Tag size={16} />
                    {product?.brand}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4">
                {product?.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="font-semibold">Key Features:</h4>
                <ul className="list-disc list-inside text-muted-foreground">
                  {product?.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <Card className="bg-secondary/10 border-0">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-primary">
                          {formatPrice(pricingDetails.sellPrice)}
                        </span>
                        {pricingDetails.hasDiscount && (
                          <Badge variant="destructive" className="text-sm">
                            {pricingDetails.discountPercentage}% OFF
                          </Badge>
                        )}
                      </div>
                      {pricingDetails.originalPrice > 0 &&
                        pricingDetails.originalPrice !==
                          pricingDetails.sellPrice && (
                          <span className="text-muted-foreground line-through text-sm">
                            MRP: {formatPrice(pricingDetails.originalPrice)}
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Total Price with Quantity */}
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Quantity Selector */}
              <div className="mt-4 bg-secondary/10 rounded-lg p-3 flex flex-col items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Quantity</span>

                  <div className="flex items-center border rounded-md overflow-hidden">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-2 py-1 hover:bg-secondary/30"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="px-4 py-1 bg-background">{quantity}</span>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-2 py-1 hover:bg-secondary/30"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= (product?.totalStock || 1000)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Available: {product?.totalStock || 0} items
                </div>
              </div>

              {/* Reviews Section */}
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <MessageCircle className="h-6 w-6" />
                    Product Reviews
                  </h3>
                  <Badge variant="secondary">{reviews.length} Reviews</Badge>
                </div>

                {/* Review Input Form */}
                <Card className="bg-secondary/10 border-0">
                  <CardContent className="p-4 space-y-3">
                    <form onSubmit={handleSubmitReview} className="space-y-3">
                      <Input
                        placeholder="Your Name"
                        value={newReview.name}
                        onChange={(e) =>
                          setNewReview({ ...newReview, name: e.target.value })
                        }
                        className="w-full"
                      />
                      <div className="flex justify-start">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-8 w-8 cursor-pointer ${
                              star <= newReview.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                            onClick={() =>
                              setNewReview({ ...newReview, rating: star })
                            }
                          />
                        ))}
                      </div>
                      <Textarea
                        placeholder="Write your review here..."
                        value={newReview.text}
                        onChange={(e) =>
                          setNewReview({ ...newReview, text: e.target.value })
                        }
                      />
                      <Button type="submit" className="w-full">
                        Submit Review
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-secondary/10 border-0">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {/* Circular Avatar */}
                            <div
                              className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center 
                         text-primary font-semibold uppercase"
                            >
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                {review.name}
                              </span>
                              <div className="text-xs text-muted-foreground">
                                {review.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.text}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Action Button */}
          <div className="sticky bottom-0 bg-white p-4 border-t shadow-md">
            <Button
              className="w-full py-6 text-base flex items-center justify-center gap-3"
              size="lg"
              onClick={() =>
                handleAddToCart({ productId: product._id, quantity: quantity })
              }
            >
              <ShoppingCart size={24} />
              Add {quantity} to Cart
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductDetailsSheet;
