"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "@/store/cart-store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useCartStore((state) => state.cart); // Zustand cart
  const cartItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Total count

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-gray-950 backdrop-blur-md border-b border-neon-500/20 shadow-xl shadow-purple-500/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div whileHover={{ rotate: 15 }} className="text-3xl">
                🚀
              </motion.div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-bold text-2xl tracking-wide group-hover:bg-gradient-to-l transition-all duration-500">
                Cosmic Shop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-6">
              <NavLink href="/" text="Home" />
              <NavLink href="/products" text="Products" />
              <NavLink href="/checkout" text="Checkout" />
              <NavLink href="/contact" text="Contact" />
            </div>

            {/* Cart Icon */}
            <Link href="/cart" className="relative group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gradient-to-br from-purple-600/30 to-cyan-500/30 group-hover:from-purple-600/50 group-hover:to-cyan-500/50 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-300 group-hover:text-pink-300 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </motion.div>
              {cartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-pink-500/50"
                >
                  {cartItems}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Cart Icon */}
            <Link href="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-cyan-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMenu}
              className="text-neon-200 hover:text-cyan-400 focus:outline-none transition-colors duration-300 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <motion.svg
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </motion.svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 bg-gradient-to-b from-gray-900 to-gray-950 backdrop-blur-sm border-t border-cyan-500/20 shadow-inner shadow-purple-500/10">
              <MobileNavLink href="/" text="Home" onClick={toggleMenu} />
              <MobileNavLink
                href="/products"
                text="Products"
                onClick={toggleMenu}
              />
              <MobileNavLink
                href="/checkout"
                text="Checkout"
                onClick={toggleMenu}
              />
              <MobileNavLink
                href="/contact"
                text="Contact"
                onClick={toggleMenu}
              />
              <MobileNavLink
                href="/cart"
                text="View Cart"
                onClick={toggleMenu}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Desktop NavLink
const NavLink = ({ href, text }) => (
  <Link
    href={href}
    className="relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-500 group"
  >
    <span className="text-gray-300 group-hover:text-white transition-colors">
      {text}
    </span>
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500 group-hover:w-3/4 group-hover:left-1/4"></span>
    <span className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
  </Link>
);

// Mobile NavLink
const MobileNavLink = ({ href, text, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="block px-4 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r from-cyan-500/10 to-purple-500/10 transition-all duration-300"
  >
    {text}
  </Link>
);

export default Navbar;
