import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";

const fetchProduct = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return undefined;
  return await res.json();
};

const ProductPage = async ({ params }) => {
  const product = await fetchProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
};

export default ProductPage;
