import React, { useState, useEffect, useCallback } from "react";
import {
  BabyIcon,
  ChevronLeft,
  ChevronRight,
  Circle,
  CloudLightningIcon,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../../assets/banner-1.jpg";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.png";

const ShoppingHome = () => {
  const slides = [
    {
      image: banner3,
      title: "Summer Collection",
      subtitle: "Upto 50% Off on Latest Trends",
      buttonText: "Shop Now",
    },
    {
      image: banner2,
      title: "New Arrivals",
      subtitle: "Fresh Styles Just Dropped",
      buttonText: "Explore",
    },
    {
      image: banner1,
      title: "Mega Sale",
      subtitle: "Biggest Discounts of the Season",
      buttonText: "Shop Sale",
    },
  ];

  const categoriesWithIcons = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightningIcon },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setDirection(1);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setDirection(-1);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setDirection(index > currentSlide ? 1 : -1);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const transition = {
    type: "tween",
    duration: 0.5,
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden group">
      {/* Carousel Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute inset-0"
        >
          {/* Image */}
          <img
            src={slides[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white max-w-xl px-4">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl mb-6"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                {slides[currentSlide].buttonText}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 hover:bg-white/70 p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-all"
      >
        <ChevronLeft className="text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 hover:bg-white/70 p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-all"
      >
        <ChevronRight className="text-black" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all
              ${
                currentSlide === index
                  ? "bg-primary scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ShoppingHome;
