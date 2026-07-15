"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export default function CategorySection() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase">Curated for You</span>
          <h2 className="text-3xl sm:text-4xl font-black text-black mt-1">Shop by Category</h2>
        </div>
        <Link
          href="/products"
          className="hidden sm:flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-black transition-colors group"
        >
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {CATEGORIES.map((category, idx) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group relative rounded-2xl overflow-hidden cursor-pointer"
            style={{ aspectRatio: idx < 2 ? "3/4" : "1/1" }}
          >
            {/* Image */}
            <div className={`absolute inset-0 ${idx < 2 ? "" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-sm sm:text-base leading-tight">{category.name}</h3>
              <p className="text-white/70 text-xs mt-0.5">{category.count} items</p>
            </div>

            {/* Hover arrow */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/20 border border-white/0 group-hover:border-white/40 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </Link>
        ))}
      </div>

      <div className="sm:hidden flex justify-center mt-6">
        <Link
          href="/products"
          className="flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-black border border-neutral-200 rounded-full px-6 py-2.5 transition-colors"
        >
          View All Categories
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
