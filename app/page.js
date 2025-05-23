import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Carousel from "@/components/carousel";

const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return products;
};

const categoryImages = {
  electronics:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  jewelery:
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  "men's clothing":
    "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  "women's clothing":
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
};

const HomePage = async ({ searchParams }) => {
  const products = await fetchProducts();
  const selectedCategory = searchParams?.category;

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 font-[Poppins] text-white">
      <section className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
          <div className="space-y-8 max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              {selectedCategory
                ? selectedCategory.replace(/-/g, " ").replace(/'s/g, "'s ")
                : "Welcome to Cosmic Shopping"}
            </h2>
            <p className="text-xl font-medium tracking-wide leading-relaxed text-gray-100 drop-shadow-[0_0_10px_rgba(124,58,237,0.2)]">
              {selectedCategory
                ? `Browse our premium ${selectedCategory
                    .replace(/-/g, " ")
                    .replace(/'s/g, "'s ")} collection`
                : "Discover the latest trends and exclusive products at Cosmic Shopping. Shop now and elevate your style."}
            </p>

            <Button
              asChild
              variant="default"
              className="relative group overflow-hidden font-semibold"
            >
              <Link href={selectedCategory ? "/" : "/products"}>
                <span className="relative z-10">
                  {selectedCategory ? "Back to Home" : "Shop Now"}
                </span>
                <span
                  className={`absolute inset-0 rounded-md transition-all duration-300 
                  ${
                    selectedCategory
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:opacity-100"
                      : "bg-gradient-to-r from-purple-600 to-pink-500 group-hover:opacity-100"
                  } opacity-0`}
                ></span>
                <span
                  className={`absolute inset-0 border-2 rounded-md transition-all duration-300 
                  ${
                    selectedCategory
                      ? "border-cyan-400 group-hover:opacity-100"
                      : "border-purple-400 group-hover:opacity-100"
                  } opacity-0`}
                ></span>
              </Link>
            </Button>
          </div>

          {filteredProducts.length > 0 && (
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gray-800 p-1 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Image
                  alt="Banner Image"
                  width={450}
                  height={450}
                  src={filteredProducts[0].image}
                  className="rounded-lg object-cover transform group-hover:scale-105 transition duration-500"
                  priority
                />
              </div>
            </div>
          )}
        </div>

        {/* Featured Products */}
        <div className="mb-24">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight drop-shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              {selectedCategory
                ? `${selectedCategory
                    .replace(/-/g, " ")
                    .replace(/'s/g, "'s ")} Collection`
                : "Featured Products"}
            </h3>
            {!selectedCategory && (
              <Link
                href="/products"
                className="text-cyan-300 hover:text-white transition-colors flex items-center gap-2 font-medium"
              >
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
          </div>
          <Carousel
            products={
              selectedCategory ? filteredProducts : filteredProducts.slice(0, 5)
            }
          />
        </div>

        {/* Categories */}
        {!selectedCategory && (
          <>
            <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 tracking-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              Shop by Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(categoryImages).map(([category, url]) => (
                <Link
                  key={category}
                  href={`/?category=${category}`}
                  className="group relative overflow-hidden rounded-xl h-48 bg-gray-800 border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:-translate-y-1"
                >
                  <Image
                    src={url}
                    alt={category}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <div className="relative h-full w-full flex items-end p-4 z-20">
                    <h4 className="text-xl font-bold text-white capitalize drop-shadow-[0_0_5px_white]">
                      {category.replace("-", " ")}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;


