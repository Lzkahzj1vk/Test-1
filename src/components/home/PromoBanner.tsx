"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Truck, RotateCcw, Shield, Headphones } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "On all orders over $500",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "30-day return policy",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    desc: "On all furniture",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Expert consultation",
  },
];

export default function PromoBanner() {
  return (
    <>
      {/* Features Bar */}
      <section className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{f.title}</h4>
                    <p className="text-neutral-400 text-xs mt-0.5">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="relative overflow-hidden">
        <div
          className="relative min-h-[500px] flex items-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/14598479/pexels-photo-14598479.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1600')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-10 w-full">
            <div>
              <span className="text-xs font-semibold text-amber-400 tracking-[0.3em] uppercase">
                Limited Time Offer
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-2 mb-4 leading-none">
                Summer Furniture
                <br />
                <span className="text-amber-400">Sale</span>
              </h2>
              <p className="text-xl text-white/80 mb-2">Up to <span className="font-black text-white">40% OFF</span></p>
              <p className="text-neutral-300 text-sm max-w-sm">
                Transform your home this summer with our biggest sale of the year. Premium quality at unbeatable prices.
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
              {/* Countdown */}
              <div className="flex items-center gap-4">
                {[
                  { value: "02", label: "Days" },
                  { value: "18", label: "Hours" },
                  { value: "45", label: "Mins" },
                  { value: "30", label: "Secs" },
                ].map((t, i) => (
                  <React.Fragment key={t.label}>
                    {i > 0 && <span className="text-white/40 text-2xl font-black">:</span>}
                    <div className="text-center">
                      <div className="text-3xl font-black text-white">{t.value}</div>
                      <div className="text-xs text-neutral-400">{t.label}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-base hover:bg-neutral-100 transition-colors group"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
