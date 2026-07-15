"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  category?: string;
  categorySlug?: string;
  colors?: string[];
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const discount = product.oldPrice
    ? calculateDiscount(product.oldPrice, product.price)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      quantity: 1,
      slug: product.slug,
      color: product.colors?.[0],
    });
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      style: { borderRadius: "12px", fontWeight: 500 },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const added = toggleWishlist({
      productId: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      slug: product.slug,
      rating: product.rating,
      reviewCount: product.reviewCount,
    });
    toast.success(added ? "Added to wishlist!" : "Removed from wishlist", {
      icon: added ? "❤️" : "💔",
      style: { borderRadius: "12px", fontWeight: 500 },
    });
  };

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-neutral-50 aspect-[4/3]">
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-neutral-200" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
              imgLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount && discount > 0 && (
              <Badge variant="sale">-{discount}%</Badge>
            )}
            {product.isBestSeller && <Badge variant="hot">Best Seller</Badge>}
            {product.isNewArrival && <Badge variant="new">New</Badge>}
          </div>

          {/* Actions overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <button
              onClick={handleWishlist}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors",
                inWishlist
                  ? "bg-red-500 text-white"
                  : "bg-white text-neutral-600 hover:bg-red-500 hover:text-white"
              )}
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" fill={inWishlist ? "currentColor" : "none"} />
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="w-9 h-9 rounded-full bg-white text-neutral-600 hover:bg-black hover:text-white flex items-center justify-center shadow-md transition-colors"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>

          {/* Add to cart bar */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className={cn(
                "w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors",
                inCart
                  ? "bg-neutral-800 text-white"
                  : "bg-black text-white hover:bg-neutral-800"
              )}
            >
              <ShoppingCart className="w-4 h-4" />
              {inCart ? "In Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        {product.category && (
          <p className="text-xs text-neutral-400 mb-1 font-medium uppercase tracking-wider">
            {product.category}
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-neutral-900 line-clamp-1 hover:text-neutral-600 transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <StarRating
          rating={product.rating}
          size="sm"
          showValue
          reviewCount={product.reviewCount}
          className="mb-3"
        />
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-black">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-neutral-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-neutral-200 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-neutral-400">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
