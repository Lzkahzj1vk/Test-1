import React from "react";
import Link from "next/link";
import { ArrowRight, Award, Heart, Leaf, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Luxora's commitment to premium quality furniture and exceptional craftsmanship.",
};

const VALUES = [
  { icon: Award, title: "Excellence", desc: "Every piece is crafted to the highest standards using premium materials." },
  { icon: Heart, title: "Passion", desc: "We are passionate about beautiful design that improves daily life." },
  { icon: Leaf, title: "Sustainability", desc: "Committed to eco-friendly production and responsible sourcing." },
  { icon: Users, title: "Community", desc: "Building lasting relationships with our customers and partners." },
];

const TEAM = [
  { name: "Elena Rossi", role: "Founder & CEO", initials: "ER" },
  { name: "Michael Chen", role: "Head of Design", initials: "MC" },
  { name: "Sarah Johnson", role: "Creative Director", initials: "SJ" },
  { name: "David Park", role: "Operations Director", initials: "DP" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/7546213/pexels-photo-7546213.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-black mb-4">Our Story</h1>
          <p className="text-xl text-neutral-200 max-w-xl mx-auto">
            Crafting extraordinary furniture experiences since 2009
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase">Our Mission</span>
            <h2 className="text-4xl font-black text-black mt-2 mb-6">
              Transforming houses into dream homes
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              At Luxora, we believe that exceptional furniture is not just about aesthetics — it's about creating spaces where life's most meaningful moments unfold. Founded in 2009 by master craftsman Elena Rossi, we've been dedicated to the pursuit of perfection in furniture design.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Each piece in our collection represents the culmination of artisan expertise, premium materials, and thoughtful design. We partner with skilled craftspeople across Europe and Asia to bring you furniture that lasts generations.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-colors group"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "500+", label: "Unique Designs" },
              { value: "50K+", label: "Happy Customers" },
              { value: "12", label: "Countries Served" },
            ].map((stat) => (
              <div key={stat.label} className="bg-neutral-50 rounded-2xl p-8 text-center">
                <div className="text-4xl font-black text-black mb-2">{stat.value}</div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase">What We Stand For</span>
            <h2 className="text-3xl font-black text-white mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center p-6">
                  <div className="w-14 h-14 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{value.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase">The People Behind Luxora</span>
          <h2 className="text-3xl font-black text-black mt-2">Meet Our Team</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
                {member.initials}
              </div>
              <h3 className="font-bold text-black">{member.name}</h3>
              <p className="text-sm text-neutral-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-black text-black mb-4">Ready to Transform Your Space?</h2>
          <p className="text-neutral-600 mb-8">Browse our curated collection of premium furniture and find the perfect pieces for your home.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-colors">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold border-2 border-black hover:bg-black hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
