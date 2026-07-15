"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/data";

const TABS = [
  { label: "All", filter: "all" },
  { label: "Featured", filter: "featured" },
  { label: "Best Sellers", filter: "best" },
  { label: "New Arrivals", filter: "new" },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = PRODUCTS.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "featured") return p.isFeatured;
    if (activeTab === "best") return p.isBestSeller;
    if (activeTab === "new") return p.isNewArrival;
    return true;
  });

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase">Handpicked for you</span>
            <h2 className="text-3xl sm:text-4xl font-black text-black mt-1">Featured Products</h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-white rounded-full p-1 border border-neutral-100 shadow-sm self-start sm:self-auto">
            {TABS.map((tab) => (
              <button
                key={tab.filter}
                onClick={() => setActiveTab(tab.filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.filter
                    ? "bg-black text-white"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                oldPrice: product.oldPrice,
                image: product.image,
                rating: product.rating,
                reviewCount: product.reviewCount,
                isBestSeller: product.isBestSeller,
                isNewArrival: product.isNewArrival,
                category: product.category,
                categorySlug: product.categorySlug,
                colors: product.colors,
              }}
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 transition-colors group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
