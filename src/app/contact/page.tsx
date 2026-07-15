"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";

const CONTACT_INFO = [
  { icon: MapPin, title: "Visit Us", info: "123 Design District, New York, NY 10001" },
  { icon: Phone, title: "Call Us", info: "+1 (800) 555-LUXO" },
  { icon: Mail, title: "Email Us", info: "hello@luxora.com" },
  { icon: Clock, title: "Hours", info: "Mon-Sat: 9AM-8PM EST" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success("Message sent successfully! We'll get back to you within 24 hours.", {
      icon: "✉️",
      duration: 5000,
      style: { borderRadius: "12px" },
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-black py-20 text-center text-white px-4">
        <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase">Get in Touch</span>
        <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-4">Contact Us</h1>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Have a question or need design advice? Our team of experts is here to help you create your perfect space.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black mb-2">We&apos;d love to hear from you</h2>
              <p className="text-neutral-500 text-sm">
                Whether you&apos;re looking for design inspiration, need help with an order, or want to learn more about our products, we&apos;re here.
              </p>
            </div>
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center flex-none">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-black">{item.title}</p>
                    <p className="text-sm text-neutral-500 mt-0.5">{item.info}</p>
                  </div>
                </div>
              );
            })}

            {/* Map placeholder */}
            <div
              className="w-full h-48 rounded-2xl overflow-hidden"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/8082233/pexels-photo-8082233.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=400')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-neutral-100 rounded-2xl p-8">
              <h2 className="text-2xl font-black mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black bg-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option>Product Inquiry</option>
                    <option>Order Support</option>
                    <option>Interior Design Consultation</option>
                    <option>Returns & Refunds</option>
                    <option>Partnership Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Message</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-2xl font-bold hover:bg-neutral-800 transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-black">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "What is your delivery timeframe?", a: "Standard delivery takes 7-14 business days. Express delivery is available in 3-5 business days for an additional fee." },
              { q: "Do you offer assembly services?", a: "Yes! We offer professional assembly as part of our White Glove Service. Our team will deliver and assemble your furniture at a convenient time." },
              { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy on all items in their original condition. Contact our team to arrange a return." },
              { q: "Can I customize furniture?", a: "Absolutely! Many of our pieces offer customization in colors, materials, and dimensions. Contact our design team for details." },
            ].map((faq) => (
              <div key={faq.q} className="bg-neutral-50 rounded-2xl p-6">
                <h3 className="font-bold text-black mb-2">{faq.q}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
