"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useCartStore from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiShoppingBag, FiCreditCard, FiLock } from "react-icons/fi";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPage = () => {
  const { cart } = useCartStore();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [cart]);

  const appearance = {
    theme: "night",
    variables: {
      colorPrimary: "#a855f7",
      colorBackground: "#111827",
      colorText: "#f3f4f6",
      colorDanger: "#ef4444",
      fontFamily: "Inter, sans-serif",
      fontSizeBase: isMobile ? "14px" : "16px",
      spacingUnit: isMobile ? "2px" : "4px",
    },
    rules: {
      ".Input": {
        border: "1px solid #374151",
        padding: isMobile ? "10px" : "12px",
        backgroundColor: "#1f2937",
        fontSize: isMobile ? "14px" : "16px",
      },
      ".Label": {
        marginBottom: isMobile ? "6px" : "8px",
        fontSize: isMobile ? "14px" : "16px",
      },
      ".Tab": {
        padding: isMobile ? "8px 12px" : "10px 16px",
      },
    },
  };

  const options = { clientSecret, appearance };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-3 sm:p-6 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          <FiShoppingBag className="text-xl sm:text-2xl text-pink-400" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
            Secure Checkout
          </h1>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 sm:py-12"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-gray-400">
              Preparing your secure checkout...
            </p>
          </motion.div>
        ) : clientSecret ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm subtotal={subtotal} isMobile={isMobile} />
            </Elements>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 sm:p-6 bg-gray-800/50 rounded-xl border border-gray-700 text-center"
          >
            <p className="text-sm sm:text-base text-red-400 mb-2">
              Unable to load payment form
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              Please try refreshing the page
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-12 flex flex-wrap gap-3 sm:gap-4 justify-center text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2 text-gray-400">
            <FiLock className="text-green-400" />
            <span>256-bit SSL Encryption</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FiCreditCard className="text-blue-400" />
            <span>Secure Payment Processing</span>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
};

function CheckoutForm({ subtotal, isMobile }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      alert(error.message);
      setIsProcessing(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ scale: 0.98 }}
      animate={{ scale: 1 }}
      className="space-y-4 sm:space-y-6 bg-gray-800/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700 shadow-lg"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 sm:space-y-6"
      >
        <PaymentElement
          options={{
            layout: isMobile ? "accordion" : "tabs",
            wallets: {
              applePay: "never",
              googlePay: "never",
            },
            // ✅ Removed fields.billingDetails.address.country
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-700"
      >
        <div className="w-full sm:w-auto">
          <p className="text-sm sm:text-base text-gray-400">Total Amount</p>
          <p className="text-xl sm:text-2xl font-bold text-pink-400">
            ${subtotal.toFixed(2)}
          </p>
        </div>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full sm:w-auto relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isProcessing ? (
              <>
                <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              <>
                <FiLock size={isMobile ? 14 : 16} /> Complete Payment
              </>
            )}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </motion.div>
    </motion.form>
  );
}

export default CheckoutPage;
