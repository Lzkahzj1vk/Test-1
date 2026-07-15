"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase">What Clients Say</span>
        <h2 className="text-3xl sm:text-4xl font-black text-black mt-1">Customer Reviews</h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-amber-400" fill="currentColor" />
            ))}
          </div>
          <span className="text-neutral-600 font-semibold">4.9 out of 5</span>
          <span className="text-neutral-400 text-sm">(2,400+ reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 relative"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-neutral-100" />
            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" />
              ))}
            </div>
            {/* Comment */}
            <p className="text-neutral-600 text-sm leading-relaxed mb-6 line-clamp-3">
              &ldquo;{review.comment}&rdquo;
            </p>
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {review.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm text-black">{review.name}</p>
                <p className="text-xs text-neutral-400">{review.role}</p>
              </div>
              <span className="ml-auto text-xs text-neutral-300">{review.date}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-50">
              <p className="text-xs text-neutral-400">Purchased: <span className="font-medium text-neutral-600">{review.product}</span></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
