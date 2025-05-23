"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  FiChevronLeft,
  FiChevronRight,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data.slice(0, 5)); // Only use first 5 products for carousel
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % products.length);
  }, [products.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
  }, [products.length]);

  useEffect(() => {
    if (!isHovered && products.length > 0 && !isMobile) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, products.length, isMobile, nextSlide]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSwipe = (swipeDirection) => {
    if (swipeDirection > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  if (products.length === 0) {
    return (
      <div className="h-80 w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading products...</div>
      </div>
    );
  }

  const currentProduct = products[current];
  const isFavorite = favorites.includes(currentProduct.id);

  // Star rating calculation
  const rating = Math.round(currentProduct.rating?.rate || 0);
  const stars = Array(5)
    .fill(0)
    .map((_, i) => i < rating);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Neon glow effect - more vibrant */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>

      {/* Touch controls for mobile */}
      <motion.div
        className="relative"
        onTouchStart={(e) => {
          if (isMobile) {
            const touchStartX = e.touches[0].clientX;
            const handleTouchEnd = (e) => {
              const touchEndX = e.changedTouches[0].clientX;
              const diff = touchEndX - touchStartX;
              if (Math.abs(diff) > 50) {
                handleSwipe(diff);
              }
              document.removeEventListener("touchend", handleTouchEnd);
            };
            document.addEventListener("touchend", handleTouchEnd);
          }
        }}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl h-80 md:h-96 shadow-2xl">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Product Image with parallax effect */}
              <motion.div
                className="relative h-3/5 md:h-3/4"
                whileHover={!isMobile ? { scale: 1.03 } : {}}
              >
                <Image
                  alt={currentProduct.title}
                  src={currentProduct.image}
                  fill
                  className="object-contain transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={current === 0}
                />
              </motion.div>

              {/* Product Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white line-clamp-1">
                      {currentProduct.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      {stars.map((filled, i) =>
                        filled ? (
                          <FaStar
                            key={i}
                            className="text-yellow-400 text-xs md:text-sm"
                          />
                        ) : (
                          <FaRegStar
                            key={i}
                            className="text-yellow-400 text-xs md:text-sm"
                          />
                        )
                      )}
                      <span className="text-xs text-gray-400 ml-1">
                        ({currentProduct.rating?.count || 0})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(currentProduct.id)}
                    className="p-2 text-pink-500 hover:text-pink-400 transition-colors"
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    {isFavorite ? (
                      <FaHeart className="text-lg md:text-xl" />
                    ) : (
                      <FiHeart className="text-lg md:text-xl" />
                    )}
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className="text-cyan-400 font-mono text-lg md:text-xl font-bold">
                      ${currentProduct.price}
                    </p>
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                      {currentProduct.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Indicators */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2 z-10">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-gradient-to-r from-cyan-400 to-purple-500 w-6"
                    : "bg-gray-600 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows - More visible on mobile */}
          {!isMobile && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-cyan-400 p-2 rounded-full transition-all hover:scale-110 shadow-lg z-10"
                aria-label="Previous slide"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-cyan-400 p-2 rounded-full transition-all hover:scale-110 shadow-lg z-10"
                aria-label="Next slide"
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Mobile swipe indicator */}
          {isMobile && (
            <div className="absolute top-4 left-0 right-0 flex justify-center">
              <div className="text-xs text-gray-400 bg-gray-800/80 px-3 py-1 rounded-full">
                Swipe to navigate
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Mobile navigation buttons */}
      {isMobile && (
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={prevSlide}
            className="p-3 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded-full transition-all shadow-lg"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded-full transition-all shadow-lg"
            aria-label="Next slide"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
