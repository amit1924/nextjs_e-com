// product-card.tsx
import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="relative overflow-hidden bg-gray-900 border border-gray-800 rounded-xl h-full transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20">
        {/* Neon glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Product Image */}
        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
            {product.title}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-cyan-400 font-mono text-lg">
              ${product.price}
            </span>
            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full capitalize">
              {product.category}
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mt-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
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
            <span className="text-xs text-gray-400 ml-1">
              ({product.rating.count})
            </span>
          </div>
        </div>

        {/* Quick view button (appears on hover) */}
        <button className="absolute top-4 right-4 bg-black/80 text-cyan-400 px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Quick View
        </button>
      </Card>
    </Link>
  );
};

export default ProductCard;
