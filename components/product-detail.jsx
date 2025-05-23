"use client";

import React, { useState } from "react";
import useCartStore from "@/store/cart-store";
import Image from "next/image";
const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) setQuantity(value);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gray-800 p-4 rounded-xl h-96">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-white neon-text-cyan">
              {product.title}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-mono text-cyan-400">
                ${product.price}
              </span>
              <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating.rate)
                        ? "fill-current"
                        : "fill-none"
                    }`}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-gray-400">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border border-gray-700 rounded-full">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center bg-transparent text-white focus:outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                Product Details
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>Free shipping on all orders</li>
                <li>30-day return policy</li>
                <li>Secure checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
