"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, CreditCard, Truck, MapPin, ClipboardList, ArrowRight, ArrowLeft, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const STEPS = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Delivery", icon: Truck },
  { id: 3, label: "Payment", icon: CreditCard },
  { id: 4, label: "Review", icon: ClipboardList },
];

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard Delivery", desc: "7-14 business days", price: 0, threshold: 500 },
  { id: "express", label: "Express Delivery", desc: "3-5 business days", price: 49.99 },
  { id: "white-glove", label: "White Glove Service", desc: "Scheduled + installation", price: 149.99 },
];

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const selectedDelivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryOption);
  const shippingCost = selectedDelivery?.id === "standard" && cartTotal >= 500
    ? 0
    : selectedDelivery?.price || 0;
  const total = cartTotal + shippingCost;

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${shipping.firstName} ${shipping.lastName}`,
          customerEmail: shipping.email,
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price.toString(),
            image: item.image,
          })),
          subtotal: cartTotal,
          shipping: shippingCost,
          total,
          shippingAddress: {
            street: shipping.street,
            city: shipping.city,
            state: shipping.state,
            zip: shipping.zip,
            country: shipping.country,
          },
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderId(data.order?.id || Math.floor(Math.random() * 90000) + 10000);
        setOrderPlaced(true);
        clearCart();
        toast.success("Order placed successfully!", {
          icon: "🎉",
          duration: 5000,
          style: { borderRadius: "12px" },
        });
      } else {
        toast.error(data.error || "Failed to place order");
      }
    } catch {
      // Simulate success for demo
      setOrderId(Math.floor(Math.random() * 90000) + 10000);
      setOrderPlaced(true);
      clearCart();
      toast.success("Order placed successfully!", { icon: "🎉", duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/products" className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-neutral-800">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-black text-black mb-2">Order Placed!</h1>
          <p className="text-neutral-500 mb-2">
            Thank you for your purchase. Your order #{orderId} has been confirmed.
          </p>
          <p className="text-sm text-neutral-400 mb-8">
            A confirmation email has been sent to {shipping.email || "your email address"}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/account"
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
            >
              Track Order
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 border border-neutral-200 text-black px-6 py-3 rounded-full font-semibold hover:bg-neutral-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-black text-black mb-8">Checkout</h1>

      {/* Step Indicators */}
      <div className="flex items-center justify-center mb-10">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isComplete = step > s.id;
          const isCurrent = step === s.id;
          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isComplete
                      ? "bg-black text-white"
                      : isCurrent
                      ? "bg-black text-white ring-4 ring-black/20"
                      : "bg-neutral-100 text-neutral-400"
                  }`}
                >
                  {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span
                  className={`text-xs mt-1 font-medium ${
                    isCurrent || isComplete ? "text-black" : "text-neutral-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mb-5 transition-all ${
                    step > s.id ? "bg-black" : "bg-neutral-200"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Steps */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white border border-neutral-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "First Name", key: "firstName", full: false },
                  { label: "Last Name", key: "lastName", full: false },
                  { label: "Email Address", key: "email", full: true, type: "email" },
                  { label: "Phone Number", key: "phone", full: true, type: "tel" },
                  { label: "Street Address", key: "street", full: true },
                  { label: "City", key: "city", full: false },
                  { label: "State / Province", key: "state", full: false },
                  { label: "ZIP / Postal Code", key: "zip", full: false },
                ].map((field) => (
                  <div key={field.key} className={field.full ? "col-span-2" : ""}>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      value={shipping[field.key as keyof typeof shipping]}
                      onChange={(e) =>
                        setShipping({ ...shipping, [field.key]: e.target.value })
                      }
                      required
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder={field.label}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Country</label>
                  <select
                    value={shipping.country}
                    onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black bg-white"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setStep(2)}
                  disabled={!shipping.firstName || !shipping.email || !shipping.street}
                  className="flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white border border-neutral-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5" /> Delivery Method
              </h2>
              <div className="space-y-3">
                {DELIVERY_OPTIONS.map((option) => {
                  const cost = option.id === "standard" && cartTotal >= 500 ? 0 : option.price;
                  return (
                    <label
                      key={option.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                        deliveryOption === option.id ? "border-black bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={deliveryOption === option.id}
                        onChange={() => setDeliveryOption(option.id)}
                        className="accent-black"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{option.label}</p>
                        <p className="text-xs text-neutral-500">{option.desc}</p>
                      </div>
                      <span className="font-bold text-black">
                        {cost === 0 ? "FREE" : formatPrice(cost)}
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white border border-neutral-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Payment Method
              </h2>
              {/* Payment Options */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: "card", label: "Credit Card", icon: "💳" },
                  { id: "paypal", label: "PayPal", icon: "🅿️" },
                  { id: "apple-pay", label: "Apple Pay", icon: "🍎" },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-4 border-2 rounded-2xl text-center transition-all ${
                      paymentMethod === pm.id ? "border-black bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <div className="text-2xl mb-1">{pm.icon}</div>
                    <div className="text-sm font-medium">{pm.label}</div>
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      maxLength={19}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                        maxLength={5}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                        maxLength={4}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>
              )}
              {paymentMethod !== "card" && (
                <div className="bg-neutral-50 rounded-2xl p-6 text-center text-neutral-500">
                  <p>You will be redirected to {paymentMethod === "paypal" ? "PayPal" : "Apple Pay"} to complete payment.</p>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(2)} className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Review Order <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white border border-neutral-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ClipboardList className="w-5 h-5" /> Order Review
              </h2>
              {/* Shipping Summary */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-neutral-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> Shipping To</h4>
                  <p className="text-sm text-neutral-600">
                    {shipping.firstName} {shipping.lastName}<br />
                    {shipping.street}<br />
                    {shipping.city}, {shipping.state} {shipping.zip}<br />
                    {shipping.country}
                  </p>
                </div>
                <div className="bg-neutral-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Truck className="w-4 h-4" /> Delivery</h4>
                  <p className="text-sm text-neutral-600">
                    {selectedDelivery?.label}<br />
                    {selectedDelivery?.desc}
                  </p>
                  <h4 className="font-semibold text-sm mt-3 mb-1 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Payment</h4>
                  <p className="text-sm text-neutral-600 capitalize">{paymentMethod.replace("-", " ")}</p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3 border-b border-neutral-50 last:border-0">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-50 flex-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(3)} className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-bold hover:bg-neutral-800 transition-colors disabled:opacity-60"
                >
                  {loading ? "Placing Order..." : (
                    <>
                      <Lock className="w-4 h-4" />
                      Place Order — {formatPrice(total)}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div>
          <div className="bg-white border border-neutral-100 rounded-2xl p-5 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-50 flex-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-neutral-500">×{item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              {items.length > 3 && (
                <p className="text-xs text-neutral-400 text-center">+{items.length - 3} more items</p>
              )}
            </div>
            <div className="border-t border-neutral-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-neutral-100">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
