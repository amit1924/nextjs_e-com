"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useCartStore from "@/store/cart-store";
import Confetti from "react-dom-confetti";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");
  const [confetti, setConfetti] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (redirectStatus === "succeeded") {
      clearCart();
      setConfetti(true);
    }
  }, [redirectStatus, clearCart]);

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a855f7", "#ec4899", "#f43f5e", "#f59e0b", "#10b981"],
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 text-white p-6">
      <div className="fixed inset-0 pointer-events-none">
        <Confetti active={confetti} config={confettiConfig} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border border-gray-700 relative overflow-hidden"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-20"></div>

        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-6xl mb-6"
        >
          🎉
        </motion.div>

        <motion.h1
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your payment has been confirmed. Thank you for your purchase!
        </motion.p>

        <motion.div
          className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700 text-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-400">Order Reference</p>
          <code className="text-pink-300 font-mono break-all">
            {paymentIntent}
          </code>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Continue Shopping
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default SuccessPage;
