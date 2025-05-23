import ProductList from "@/components/product-list";
import React from "react";

const ProductsPage = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with neon effect */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover our exclusive collection of premium products
          </p>
        </div>

        {/* Neon divider */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gray-900 text-sm text-cyan-400 font-mono">
              ✦ ✦ ✦
            </span>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg shadow-purple-500/10 p-6">
          <ProductList />
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Can't find what you're looking for?{" "}
            <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
              Contact us
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
