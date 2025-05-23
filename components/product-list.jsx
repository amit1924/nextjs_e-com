"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./product-card";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      product.title.toLowerCase().includes(search) ||
      (product.description &&
        product.description.toLowerCase().includes(search))
    );
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-xl h-96 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-gray-800 border border-gray-700 rounded-full py-3 px-6 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Loading More Indicator */}
      <div className="mt-12 flex justify-center">
        <button className="bg-gray-800 hover:bg-gray-700 text-cyan-400 px-6 py-3 rounded-full flex items-center gap-2 transition-all border border-gray-700 hover:border-cyan-400">
          Load More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductList;
