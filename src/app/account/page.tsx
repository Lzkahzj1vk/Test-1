"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  TrendingUp,
  Star,
  ChevronRight,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

type SectionKey = "dashboard" | "orders" | "wishlist" | "addresses" | "payment" | "notifications" | "settings";

const SIDEBAR_LINKS: { label: string; icon: React.ComponentType<{ className?: string }>; key: SectionKey }[] = [
  { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "My Orders", icon: Package, key: "orders" },
  { label: "Wishlist", icon: Heart, key: "wishlist" },
  { label: "Addresses", icon: MapPin, key: "addresses" },
  { label: "Payment Methods", icon: CreditCard, key: "payment" },
  { label: "Notifications", icon: Bell, key: "notifications" },
  { label: "Settings", icon: Settings, key: "settings" },
];

const MOCK_ORDERS = [
  { id: "LX-10241", product: "Nordic Velvet Sofa", date: "Jan 15, 2025", status: "delivered", total: 1299, image: "https://images.pexels.com/photos/8135491/pexels-photo-8135491.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200" },
  { id: "LX-10189", product: "Marble Dining Table", date: "Dec 28, 2024", status: "shipped", total: 2499, image: "https://images.pexels.com/photos/14598479/pexels-photo-14598479.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200" },
  { id: "LX-10093", product: "Executive Office Chair", date: "Dec 10, 2024", status: "pending", total: 899, image: "https://images.pexels.com/photos/8082233/pexels-photo-8082233.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200" },
];

const STATUS_CONFIG = {
  delivered: { label: "Delivered", color: "text-emerald-600 bg-emerald-50", icon: CheckCircle },
  shipped: { label: "Shipped", color: "text-blue-600 bg-blue-50", icon: Truck },
  pending: { label: "Pending", color: "text-amber-600 bg-amber-50", icon: Clock },
  processing: { label: "Processing", color: "text-purple-600 bg-purple-50", icon: Package },
};

export default function AccountPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("dashboard");
  const { items: wishlistItems } = useWishlist();
  const { cartCount } = useCart();

  const stats = [
    { label: "Total Orders", value: "3", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
    { label: "Pending", value: "1", icon: Clock, color: "bg-amber-50 text-amber-600" },
    { label: "Delivered", value: "1", icon: CheckCircle, color: "bg-emerald-50 text-emerald-600" },
    { label: "Wishlist", value: wishlistItems.length.toString(), icon: Heart, color: "bg-red-50 text-red-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden md:block">
          {/* Profile */}
          <div className="bg-black text-white rounded-2xl p-6 mb-4 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-black">
              JD
            </div>
            <h3 className="font-bold">John Doe</h3>
            <p className="text-neutral-400 text-sm">john@example.com</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-center gap-1 text-amber-400 text-sm">
                <Star className="w-4 h-4" fill="currentColor" />
                <span className="font-semibold">Premium Member</span>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {SIDEBAR_LINKS.map(({ label, icon: Icon, key }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === key
                    ? "bg-black text-white"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-black"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {key === "orders" && (
                  <span className="ml-auto text-xs bg-neutral-800 text-white px-2 py-0.5 rounded-full">
                    {MOCK_ORDERS.length}
                  </span>
                )}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-4">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 md:hidden pb-2">
            {SIDEBAR_LINKS.map(({ label, icon: Icon, key }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-none transition-all ${
                  activeSection === key ? "bg-black text-white" : "bg-neutral-100 text-neutral-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Welcome back, John! 👋</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white border border-neutral-100 rounded-2xl p-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-3xl font-black text-black">{stat.value}</div>
                      <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Orders */}
              <div className="bg-white border border-neutral-100 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Recent Orders</h3>
                  <button onClick={() => setActiveSection("orders")} className="text-sm text-neutral-500 hover:text-black flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {MOCK_ORDERS.slice(0, 2).map((order) => {
                    const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
                    const StatusIcon = status.icon;
                    return (
                      <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 flex-none">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{order.product}</p>
                          <p className="text-xs text-neutral-500">{order.id} · {order.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                          <span className="font-bold text-sm">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Browse Products", href: "/products", icon: "🛋️", desc: "Explore our collection" },
                  { label: "View Wishlist", href: "/wishlist", icon: "❤️", desc: `${wishlistItems.length} saved items` },
                  { label: "Shopping Cart", href: "/cart", icon: "🛒", desc: `${cartCount} items in cart` },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="bg-neutral-50 rounded-2xl p-5 hover:bg-neutral-100 transition-colors group"
                  >
                    <div className="text-3xl mb-3">{action.icon}</div>
                    <h4 className="font-semibold text-sm text-black">{action.label}</h4>
                    <p className="text-xs text-neutral-500 mt-1">{action.desc}</p>
                    <ChevronRight className="w-4 h-4 mt-2 text-neutral-400 group-hover:text-black transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeSection === "orders" && (
            <div>
              <h2 className="text-2xl font-black mb-6">My Orders</h2>
              <div className="space-y-4">
                {MOCK_ORDERS.map((order) => {
                  const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
                  const StatusIcon = status.icon;
                  return (
                    <div key={order.id} className="bg-white border border-neutral-100 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="font-bold text-lg">{order.id}</span>
                          <span className="text-neutral-500 text-sm ml-3">{order.date}</span>
                        </div>
                        <span className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${status.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-none">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{order.product}</p>
                          <p className="text-sm text-neutral-500">Qty: 1</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{formatPrice(order.total)}</div>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4 pt-4 border-t border-neutral-50">
                        <button className="flex-1 border border-neutral-200 rounded-xl py-2 text-sm font-medium hover:bg-neutral-50 transition-colors">
                          Track Order
                        </button>
                        <button className="flex-1 border border-neutral-200 rounded-xl py-2 text-sm font-medium hover:bg-neutral-50 transition-colors">
                          View Invoice
                        </button>
                        {order.status === "delivered" && (
                          <button className="flex-1 bg-black text-white rounded-xl py-2 text-sm font-medium hover:bg-neutral-800 transition-colors">
                            Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === "wishlist" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">My Wishlist</h2>
                <Link href="/wishlist" className="text-sm font-medium text-neutral-500 hover:text-black">
                  View All →
                </Link>
              </div>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16 bg-neutral-50 rounded-2xl">
                  <Heart className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-500 mb-4">No items in wishlist yet</p>
                  <Link href="/products" className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium">
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 bg-white border border-neutral-100 rounded-2xl p-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="font-bold">{formatPrice(item.price)}</p>
                      </div>
                      <Link href={`/products/${item.slug}`} className="bg-black text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "addresses" && (
            <div>
              <h2 className="text-2xl font-black mb-6">Saved Addresses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-black rounded-2xl p-5 relative">
                  <span className="absolute top-3 right-3 text-xs bg-black text-white px-2 py-0.5 rounded-full font-medium">Default</span>
                  <MapPin className="w-5 h-5 mb-3" />
                  <p className="font-bold mb-1">Home</p>
                  <p className="text-sm text-neutral-600">123 Main Street<br />New York, NY 10001<br />United States</p>
                  <div className="flex gap-2 mt-4">
                    <button className="text-sm font-medium text-neutral-600 hover:text-black">Edit</button>
                    <span className="text-neutral-300">·</span>
                    <button className="text-sm font-medium text-red-500 hover:text-red-600">Delete</button>
                  </div>
                </div>
                <button className="border-2 border-dashed border-neutral-200 rounded-2xl p-5 hover:border-black hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 text-neutral-500 hover:text-black font-medium">
                  + Add New Address
                </button>
              </div>
            </div>
          )}

          {activeSection === "payment" && (
            <div>
              <h2 className="text-2xl font-black mb-6">Payment Methods</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-2xl p-5 text-white">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-sm font-medium opacity-70">Credit Card</span>
                    <span className="text-sm font-bold">VISA</span>
                  </div>
                  <p className="text-xl font-mono tracking-widest">•••• •••• •••• 4242</p>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-xs opacity-60">CARD HOLDER</p>
                      <p className="font-semibold text-sm">John Doe</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60">EXPIRES</p>
                      <p className="font-semibold text-sm">12/27</p>
                    </div>
                  </div>
                </div>
                <button className="border-2 border-dashed border-neutral-200 rounded-2xl p-5 hover:border-black hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 text-neutral-500 hover:text-black font-medium">
                  + Add Payment Method
                </button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div>
              <h2 className="text-2xl font-black mb-6">Notifications</h2>
              <div className="space-y-3">
                {[
                  { icon: "📦", title: "Order #LX-10241 Delivered", desc: "Your Nordic Velvet Sofa has been delivered.", time: "2 hours ago", unread: true },
                  { icon: "🚚", title: "Order #LX-10189 Shipped", desc: "Your Marble Dining Table is on its way.", time: "1 day ago", unread: true },
                  { icon: "🎉", title: "Summer Sale Started!", desc: "Enjoy up to 40% off on selected items.", time: "2 days ago", unread: false },
                  { icon: "⭐", title: "Review Reminder", desc: "How was your Executive Office Chair?", time: "5 days ago", unread: false },
                ].map((notif, i) => (
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl transition-colors ${notif.unread ? "bg-blue-50 border border-blue-100" : "bg-white border border-neutral-100"}`}>
                    <span className="text-2xl">{notif.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{notif.title}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{notif.desc}</p>
                      <p className="text-xs text-neutral-400 mt-1">{notif.time}</p>
                    </div>
                    {notif.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-none mt-1" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "settings" && (
            <div>
              <h2 className="text-2xl font-black mb-6">Account Settings</h2>
              <div className="bg-white border border-neutral-100 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="font-bold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "First Name", value: "John" },
                      { label: "Last Name", value: "Doe" },
                      { label: "Email", value: "john@example.com" },
                      { label: "Phone", value: "+1 555-0123" },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-xs font-medium text-neutral-500 mb-1">{field.label}</label>
                        <input
                          type="text"
                          defaultValue={field.value}
                          className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-neutral-100">
                  <h3 className="font-bold mb-4">Preferences</h3>
                  {[
                    { label: "Email Notifications", desc: "Receive order updates via email" },
                    { label: "SMS Notifications", desc: "Receive SMS alerts for deliveries" },
                    { label: "Marketing Emails", desc: "Get exclusive offers and promotions" },
                  ].map((pref) => (
                    <div key={pref.label} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium">{pref.label}</p>
                        <p className="text-xs text-neutral-400">{pref.desc}</p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" defaultChecked className="sr-only" />
                        <div className="w-10 h-6 bg-black rounded-full cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-5 transition-all" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-neutral-800 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Trending */}
      <div className="mt-8 bg-neutral-50 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-bold">Trending for You</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Nordic Velvet Sofa", "Marble Table", "Lounge Chair", "Platform Bed"].map((item) => (
            <Link
              key={item}
              href="/products"
              className="bg-white border border-neutral-100 rounded-xl p-3 text-sm font-medium text-neutral-700 hover:border-black hover:text-black transition-all text-center"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
