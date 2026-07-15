"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/data";

interface ProductSliderProps {
  title: string;
  subtitle?: string;
  filter?: "best" | "new" | "featured" | "all";
  excludeId?: number;
  categorySlug?: string;
}

export default function ProductSlider({
  title,
  subtitle,
  filter = "all",
  excludeId,
  categorySlug,
}: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const products = PRODUCTS.filter((p) => {
    if (excludeId && p.id === excludeId) return false;
    if (categorySlug && p.categorySlug !== categorySlug) return false;
    if (filter === "best") return p.isBestSeller;
    if (filter === "new") return p.isNewArrival;
    if (filter === "featured") return p.isFeatured;
    return true;
  });

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-black text-black">{title}</h3>
          {subtitle && <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 border border-neutral-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 border border-neutral-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-64 sm:w-72"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard
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
          </div>
        ))}
      </div>
    </div>
  );
}
