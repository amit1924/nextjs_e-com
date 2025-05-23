"use client";

import React from "react";
import useCartStore from "@/store/cart-store";
import Link from "next/link";
import { motion } from "framer-motion";

const CartPage = () => {
  const { cart, removeFromCart, addToCart } = useCartStore();

  const handleIncrement = (product) => {
    addToCart(product, 1);
  };

  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      addToCart(product, -1);
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-gradient-to-r from-cyan-400 to-pink-400">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg">Your cart is empty 😔</p>
          <Link
            href="/products"
            className="text-pink-400 hover:underline mt-4 inline-block"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="p-4 bg-gray-900 rounded-lg shadow-lg flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-400">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-700 rounded">
                  <button
                    onClick={() => handleDecrement(item)}
                    className="px-2 py-1 bg-gray-800 hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    className="px-2 py-1 bg-gray-800 hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          ))}

          <div className="mt-8 text-right">
            <h3 className="text-xl font-bold">
              Total:{" "}
              <span className="text-pink-400">${subtotal.toFixed(2)}</span>
            </h3>
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded shadow hover:from-purple-700 hover:to-pink-600 transition">
              <Link href="/checkout">Proceed to checkout</Link>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
