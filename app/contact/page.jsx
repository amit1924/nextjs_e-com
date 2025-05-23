"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import {
  FiSend,
  FiUser,
  FiMail,
  FiMessageSquare,
  FiMapPin,
  FiPhone,
  FiClock,
} from "react-icons/fi";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";
import { SiDiscord } from "react-icons/si";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      setIsSubmitting(false);
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      toast.error("Please enter a valid email");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://linkedin.com",
      color: "hover:bg-blue-700",
    },
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com",
      color: "hover:bg-gray-700",
    },
    {
      icon: <FaTwitter />,
      name: "Twitter",
      url: "https://twitter.com",
      color: "hover:bg-blue-400",
    },
    {
      icon: <FaWhatsapp />,
      name: "WhatsApp",
      url: "https://wa.me",
      color: "hover:bg-green-500",
    },
    {
      icon: <FaTelegram />,
      name: "Telegram",
      url: "https://t.me",
      color: "hover:bg-blue-500",
    },
    {
      icon: <SiDiscord />,
      name: "Discord",
      url: "https://discord.com",
      color: "hover:bg-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster
        position={isMobile ? "top-center" : "top-right"}
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #7e22ce",
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Navigation Tabs */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "contact"
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Contact Form
              </button>
              <button
                onClick={() => setActiveTab("info")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === "info"
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                My Info
              </button>
            </div>
          </motion.div>
        )}

        <div className="text-center mb-8 sm:mb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-3 sm:mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Have a project in mind or want to collaborate? Reach out through the
            form or connect with me directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Contact Form - Always visible on desktop, conditional on mobile */}
          {(!isMobile || activeTab === "contact") && (
            <motion.form
              initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6 bg-gray-800/30 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-xl"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-1"
              >
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-gray-300 text-sm sm:text-base"
                >
                  <FiUser className="text-purple-400" /> Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all text-sm sm:text-base"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-1"
              >
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-gray-300 text-sm sm:text-base"
                >
                  <FiMail className="text-purple-400" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all text-sm sm:text-base"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="space-y-1"
              >
                <label
                  htmlFor="message"
                  className="flex items-center gap-2 text-gray-300 text-sm sm:text-base"
                >
                  <FiMessageSquare className="text-purple-400" /> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={isMobile ? 4 : 5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all text-sm sm:text-base"
                  placeholder="Your message here..."
                ></textarea>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                  isSubmitting
                    ? "bg-purple-800 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          )}

          {/* Contact Information - Always visible on desktop, conditional on mobile */}
          {(!isMobile || activeTab === "info") && (
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="bg-gray-800/30 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-xl h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 sm:mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg">
                      <FiMail className="text-purple-400 text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs sm:text-sm">
                        Email
                      </h4>
                      <a
                        href="mailto:amit192400@gmail.com"
                        className="text-white hover:text-purple-400 transition-colors text-sm sm:text-base"
                      >
                        amit192400@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg">
                      <FiPhone className="text-blue-400 text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs sm:text-sm">
                        Phone
                      </h4>
                      <a
                        href="tel:+918340616588"
                        className="text-white hover:text-blue-400 transition-colors text-sm sm:text-base"
                      >
                        +91 8340616588
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <div className="p-2 sm:p-3 bg-cyan-500/10 rounded-lg">
                      <FiMapPin className="text-cyan-400 text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs sm:text-sm">
                        Location
                      </h4>
                      <p className="text-white text-sm sm:text-base">
                        Patna, Bihar, India
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <div className="p-2 sm:p-3 bg-yellow-500/10 rounded-lg">
                      <FiClock className="text-yellow-400 text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs sm:text-sm">
                        Availability
                      </h4>
                      <p className="text-white text-sm sm:text-base">
                        Mon-Fri: 9AM - 5PM IST
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="mt-8 sm:mt-12"
                >
                  <h4 className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                    Connect with me
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 + index * 0.1 }}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 sm:p-3 bg-gray-700 ${social.color} rounded-lg transition-colors flex flex-col items-center`}
                        aria-label={social.name}
                      >
                        <span className="text-white text-lg sm:text-xl">
                          {social.icon}
                        </span>
                        {isMobile && (
                          <span className="text-xs text-gray-300 mt-1">
                            {social.name}
                          </span>
                        )}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Contact Buttons for Mobile */}
                {isMobile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="mt-6 grid grid-cols-2 gap-3"
                  >
                    <a
                      href="mailto:amit192400@gmail.com"
                      className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <FiMail /> Email
                    </a>
                    <a
                      href="tel:+918340616588"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <FiPhone /> Call
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 sm:mt-12 text-center text-gray-400 text-xs sm:text-sm"
        >
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
          <p className="mt-1">Designed with ❤️ by Amit</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
