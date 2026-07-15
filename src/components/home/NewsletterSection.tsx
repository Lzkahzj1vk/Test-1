"use client";

import React, { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Welcome to Luxora! Check your email for exclusive offers.", {
          icon: "🎉",
          duration: 4000,
          style: { borderRadius: "12px" },
        });
        setEmail("");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail className="w-7 h-7 text-white" />
        </div>
        <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase">Stay Connected</span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-3">
          Join the Luxora Family
        </h2>
        <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
          Subscribe and get exclusive access to new arrivals, special promotions, interior design tips, and members-only discounts.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-neutral-500 rounded-full px-5 py-3.5 text-sm outline-none focus:border-white/50 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-neutral-100 transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {loading ? "Subscribing..." : "Subscribe"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-neutral-600 text-xs mt-4">
          No spam, ever. Unsubscribe at any time.
        </p>

        <div className="flex items-center justify-center gap-8 mt-10 pt-10 border-t border-white/10">
          {[
            { value: "50,000+", label: "Subscribers" },
            { value: "Weekly", label: "Updates" },
            { value: "Exclusive", label: "Offers" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-white font-bold text-lg">{s.value}</div>
              <div className="text-neutral-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
