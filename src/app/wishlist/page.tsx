"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (item: (typeof items)[number]) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      oldPrice: item.oldPrice,
      image: item.image,
      quantity: 1,
      slug: item.slug,
    });
    toast.success(`${item.name} added to cart!`, {
      icon: "🛒",
      style: { borderRadius: "12px" },
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-neutral-300" />
          </div>
          <h1 className="text-3xl font-black text-black mb-3">Your Wishlist is Empty</h1>
          <p className="text-neutral-500 mb-8">
            Save your favorite pieces and come back when you&apos;re ready to purchase.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-colors"
          >
            Start Browsing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-black">My Wishlist</h1>
          <p className="text-neutral-500 mt-1">{items.length} saved {items.length === 1 ? "item" : "items"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => {
          const inCart = isInCart(item.productId);
          return (
            <div
              key={item.productId}
              className="bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <Link href={`/products/${item.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-semibold text-neutral-900 hover:text-neutral-600 transition-colors mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                </Link>
                <StarRating
                  rating={item.rating}
                  size="sm"
                  showValue
                  reviewCount={item.reviewCount}
                  className="mb-3"
                />
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-lg">{formatPrice(item.price)}</span>
                  {item.oldPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatPrice(item.oldPrice)}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      inCart
                        ? "bg-neutral-800 text-white"
                        : "bg-black text-white hover:bg-neutral-800"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {inCart ? "In Cart" : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => {
                      removeFromWishlist(item.productId);
                      toast.success("Removed from wishlist", { style: { borderRadius: "12px" } });
                    }}
                    className="w-10 h-10 border border-neutral-200 rounded-xl flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
