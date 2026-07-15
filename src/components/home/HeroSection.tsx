"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

const SLIDES = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/8135492/pexels-photo-8135492.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    tag: "New Collection 2025",
    title: "Discover Luxury\nFurniture for Your\nDream Home",
    subtitle: "Premium sofas, tables, chairs, bedrooms, and modern home décor.",
    cta: "Shop Now",
    ctaHref: "/products",
    secondary: "Explore Collection",
    secondaryHref: "/products?filter=featured",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/7174113/pexels-photo-7174113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    tag: "Best Sellers",
    title: "Timeless Designs\nCrafted for\nModern Living",
    subtitle: "Each piece tells a story of craftsmanship and elegant simplicity.",
    cta: "View Best Sellers",
    ctaHref: "/products?filter=best",
    secondary: "Learn More",
    secondaryHref: "/about",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/8082562/pexels-photo-8082562.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    tag: "Bedroom Collection",
    title: "Transform Your\nBedroom into a\nSanctuary",
    subtitle: "Luxurious beds, wardrobes, and bedroom accessories for ultimate comfort.",
    cta: "Shop Bedroom",
    ctaHref: "/products?category=bedroom",
    secondary: "View Lookbook",
    secondaryHref: "/products",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] w-full overflow-hidden">
      {/* Background */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 transition-all duration-500 ${
          animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] text-neutral-300 uppercase mb-4 border border-neutral-500 rounded-full px-4 py-1.5">
            {slide.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none mb-6 whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="text-lg text-neutral-200 mb-8 max-w-lg leading-relaxed">
            {slide.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={slide.ctaHref}>
              <Button size="lg" className="bg-white text-black hover:bg-neutral-100 rounded-full px-8 py-3.5 font-semibold">
                {slide.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={slide.secondaryHref}>
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10 border border-white/30 rounded-full px-8 py-3.5 font-semibold"
              >
                {slide.secondary}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-12">
          {[
            { value: "500+", label: "Products" },
            { value: "50K+", label: "Happy Customers" },
            { value: "15+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-white">
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-xs text-neutral-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3 z-10">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full glass border border-white/30 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full glass border border-white/30 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/50 text-xs">Scroll</span>
        <div className="w-px h-8 bg-white/30" />
      </div>
    </section>
  );
}
