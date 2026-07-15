"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const COUPONS: Record<string, number> = {
  LUXORA10: 10,
  SUMMER20: 20,
  WELCOME15: 15,
};

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const shipping = cartTotal > 500 ? 0 : 49.99;
  const discountAmount = (cartTotal * discount) / 100;
  const total = cartTotal - discountAmount + shipping;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setDiscount(COUPONS[code]);
      setAppliedCoupon(code);
      toast.success(`Coupon applied! ${COUPONS[code]}% off`, {
        icon: "🎉",
        style: { borderRadius: "12px" },
      });
    } else {
      toast.error("Invalid coupon code", { style: { borderRadius: "12px" } });
    }
    setCoupon("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    toast.success("Coupon removed", { style: { borderRadius: "12px" } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-neutral-300" />
          </div>
          <h1 className="text-3xl font-black text-black mb-3">Your Cart is Empty</h1>
          <p className="text-neutral-500 mb-8">
            Looks like you haven&apos;t added any items yet. Start shopping our premium furniture collection.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-colors"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-black">
          Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </h1>
        <button
          onClick={() => {
            clearCart();
            toast.success("Cart cleared", { style: { borderRadius: "12px" } });
          }}
          className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white border border-neutral-100 rounded-2xl p-4 hover:shadow-sm transition-shadow"
            >
              <Link href={`/products/${item.slug}`} className="flex-none">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-neutral-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="font-semibold text-black hover:text-neutral-700 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 mt-1">
                      {item.color && (
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-3 h-3 rounded-full border border-neutral-200"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs text-neutral-500">Color</span>
                        </div>
                      )}
                      {item.size && (
                        <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md">
                          {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.success("Item removed", { style: { borderRadius: "12px" } });
                    }}
                    className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 hover:bg-neutral-50 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-1.5 font-bold text-sm min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 hover:bg-neutral-50 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="font-bold text-lg text-black">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-neutral-400">
                        {formatPrice(item.price)} each
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-5">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Promo Code
            </h3>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <div>
                  <span className="font-bold text-emerald-700 text-sm">{appliedCoupon}</span>
                  <span className="text-emerald-600 text-xs ml-2">-{discount}%</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-red-500 hover:text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  className="flex-1 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            <p className="text-xs text-neutral-400 mt-2">Try: LUXORA10, SUMMER20, WELCOME15</p>
          </div>

          {/* Summary */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-lg">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal ({items.length} items)</span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({discount}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-600 flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  Shipping
                </span>
                <span className={shipping === 0 ? "text-emerald-600 font-medium" : "font-medium"}>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-neutral-400 bg-neutral-50 rounded-lg px-3 py-2">
                  Add {formatPrice(500 - cartTotal)} more for free shipping
                </p>
              )}
            </div>

            <div className="border-t border-neutral-100 pt-4">
              <div className="flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-black text-xl text-black">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">Including taxes and fees</p>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-2xl font-bold text-base hover:bg-neutral-800 transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/products"
              className="w-full flex items-center justify-center text-sm text-neutral-500 hover:text-black transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Security badges */}
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
            <span>🔒</span>
            <span>Secure checkout powered by SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
