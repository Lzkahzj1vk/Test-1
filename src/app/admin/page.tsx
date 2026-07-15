"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  Tag,
  Star,
  BarChart2,
  Boxes,
  CreditCard,
  Settings,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit2,
  Trash2,
  Plus,
  Search,
  Download,
  Bell,
  ChevronRight,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

type AdminSection = "dashboard" | "products" | "categories" | "orders" | "customers" | "analytics" | "settings";

const SIDEBAR_ITEMS: { label: string; icon: React.ComponentType<{ className?: string }>; key: AdminSection; badge?: string }[] = [
  { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "Products", icon: Package, key: "products", badge: "12" },
  { label: "Categories", icon: FolderOpen, key: "categories" },
  { label: "Orders", icon: ShoppingCart, key: "orders", badge: "5" },
  { label: "Customers", icon: Users, key: "customers" },
  { label: "Analytics", icon: BarChart2, key: "analytics" },
  { label: "Settings", icon: Settings, key: "settings" },
];

const DASHBOARD_STATS = [
  { label: "Total Revenue", value: "$48,290", change: "+12.5%", up: true, icon: CreditCard, color: "bg-emerald-50 text-emerald-600" },
  { label: "Total Orders", value: "284", change: "+8.2%", up: true, icon: ShoppingCart, color: "bg-blue-50 text-blue-600" },
  { label: "Total Customers", value: "1,492", change: "+15.3%", up: true, icon: Users, color: "bg-purple-50 text-purple-600" },
  { label: "Products Sold", value: "892", change: "-2.4%", up: false, icon: Boxes, color: "bg-amber-50 text-amber-600" },
];

const MOCK_ORDERS = [
  { id: "LX-10245", customer: "Alexandra Chen", product: "Nordic Velvet Sofa", status: "delivered", total: 1299, date: "Jan 18, 2025" },
  { id: "LX-10244", customer: "Marcus Williams", product: "Marble Dining Table", status: "shipped", total: 2499, date: "Jan 17, 2025" },
  { id: "LX-10243", customer: "Sofia Rodriguez", product: "Platform Bed Frame", status: "processing", total: 1799, date: "Jan 17, 2025" },
  { id: "LX-10242", customer: "James Thompson", product: "Executive Office Chair", status: "pending", total: 899, date: "Jan 16, 2025" },
  { id: "LX-10241", customer: "Emma Davis", product: "Accent Lounge Chair", status: "delivered", total: 649, date: "Jan 15, 2025" },
];

const MOCK_CUSTOMERS = [
  { name: "Alexandra Chen", email: "alex@example.com", orders: 5, spent: 8940, joined: "Mar 2024", status: "active" },
  { name: "Marcus Williams", email: "marcus@example.com", orders: 3, spent: 6240, joined: "Jun 2024", status: "active" },
  { name: "Sofia Rodriguez", email: "sofia@example.com", orders: 7, spent: 12490, joined: "Jan 2024", status: "active" },
  { name: "James Thompson", email: "james@example.com", orders: 2, spent: 3200, joined: "Sep 2024", status: "blocked" },
];

const STATUS_CONFIG = {
  delivered: { label: "Delivered", color: "text-emerald-600 bg-emerald-50" },
  shipped: { label: "Shipped", color: "text-blue-600 bg-blue-50" },
  pending: { label: "Pending", color: "text-amber-600 bg-amber-50" },
  processing: { label: "Processing", color: "text-purple-600 bg-purple-50" },
};

// Simple bar chart using CSS
function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-3 h-36">
      {data.map((d) => (
        <div key={d.label} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full bg-black rounded-t-lg transition-all duration-700"
            style={{ height: `${(d.value / max) * 100}%`, minHeight: "4px" }}
          />
          <span className="text-xs text-neutral-500 whitespace-nowrap">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [productSearch, setProductSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredCustomers = MOCK_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const monthlyData = [
    { label: "Aug", value: 32000 },
    { label: "Sep", value: 38000 },
    { label: "Oct", value: 29000 },
    { label: "Nov", value: 45000 },
    { label: "Dec", value: 52000 },
    { label: "Jan", value: 48000 },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex-none hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-sm">L</span>
            </div>
            <div>
              <div className="font-black text-lg">LUXORA</div>
              <div className="text-xs text-neutral-400">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map(({ label, icon: Icon, key, badge }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSection === key
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {badge && (
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${activeSection === key ? "bg-black text-white" : "bg-white/20 text-white"}`}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-400 hover:text-white rounded-xl hover:bg-white/10 transition-all">
            <Eye className="w-4 h-4" />
            View Store
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl capitalize">{activeSection}</h1>
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <Link href="/" className="hover:text-black">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="capitalize">{activeSection}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-neutral-50 rounded-xl">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {DASHBOARD_STATS.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 border border-neutral-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                          {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-black text-black">{stat.value}</div>
                      <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-neutral-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold">Monthly Revenue</h3>
                    <select className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5">
                      <option>Last 6 months</option>
                      <option>Last year</option>
                    </select>
                  </div>
                  <BarChart data={monthlyData} />
                  <div className="mt-4 flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-neutral-500">This month</span>
                      <span className="font-bold ml-2">$48,290</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Last month</span>
                      <span className="font-bold ml-2">$52,100</span>
                    </div>
                    <span className="text-red-500 text-xs font-semibold">-7.3%</span>
                  </div>
                </div>

                {/* Best Selling */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h3 className="font-bold mb-4">Best Selling</h3>
                  <div className="space-y-4">
                    {PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4).map((product, i) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <span className="text-sm font-bold text-neutral-300 w-4">{i + 1}</span>
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-100 flex-none">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                          <p className="text-xs text-neutral-500">{formatPrice(product.price)}</p>
                        </div>
                        <div className="text-xs font-bold text-emerald-600">
                          {Math.floor(Math.random() * 50) + 20} sold
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                  <h3 className="font-bold">Recent Orders</h3>
                  <button onClick={() => setActiveSection("orders")} className="text-sm text-neutral-500 hover:text-black flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-50 bg-neutral-50">
                        {["Order ID", "Customer", "Product", "Status", "Total", "Date"].map((h) => (
                          <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_ORDERS.slice(0, 5).map((order) => {
                        const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
                        return (
                          <tr key={order.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                            <td className="px-6 py-4 text-sm">{order.customer}</td>
                            <td className="px-6 py-4 text-sm text-neutral-600">{order.product}</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                                {status.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-bold">{formatPrice(order.total)}</td>
                            <td className="px-6 py-4 text-sm text-neutral-500">{order.date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Section */}
          {activeSection === "products" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 border border-neutral-200 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-neutral-50">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-neutral-800">
                    <Plus className="w-4 h-4" />
                    Add Product
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50">
                        {["Product", "Category", "Price", "Stock", "Rating", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 flex-none">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{product.name}</p>
                                <p className="text-xs text-neutral-500">{product.brand}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-600">{product.category}</td>
                          <td className="px-6 py-4">
                            <div>
                              <span className="text-sm font-bold">{formatPrice(product.price)}</span>
                              {product.oldPrice && (
                                <span className="text-xs text-neutral-400 line-through ml-1">{formatPrice(product.oldPrice)}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-sm font-medium ${product.stock < 10 ? "text-red-500" : "text-emerald-600"}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                              <span className="text-sm font-medium">{product.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {product.isNewArrival && (
                              <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full font-medium mr-1">New</span>
                            )}
                            {product.isBestSeller && (
                              <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full font-medium">Best Seller</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/products/${product.slug}`}
                                className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4 text-neutral-500" />
                              </Link>
                              <button className="p-1.5 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4 text-neutral-500" />
                              </button>
                              <button className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4 text-neutral-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Categories Section */}
          {activeSection === "categories" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-neutral-800">
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                    <div className="relative h-40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="font-bold">{cat.name}</h3>
                        <p className="text-sm text-white/70">{cat.count} products</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center gap-2">
                      <button className="flex-1 border border-neutral-200 rounded-xl py-2 text-sm font-medium hover:bg-neutral-50 flex items-center justify-center gap-1">
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button className="flex-1 border border-neutral-200 rounded-xl py-2 text-sm font-medium hover:bg-red-50 hover:text-red-500 hover:border-red-200 flex items-center justify-center gap-1 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === "orders" && (
            <div className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Orders", value: "284", icon: ShoppingCart, color: "bg-blue-50 text-blue-600" },
                  { label: "Pending", value: "12", icon: Clock, color: "bg-amber-50 text-amber-600" },
                  { label: "Shipped", value: "48", icon: Truck, color: "bg-purple-50 text-purple-600" },
                  { label: "Delivered", value: "224", icon: CheckCircle, color: "bg-emerald-50 text-emerald-600" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 border border-neutral-100">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-black">{stat.value}</div>
                      <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                  <h3 className="font-bold">All Orders</h3>
                  <button className="flex items-center gap-2 border border-neutral-200 px-4 py-2 rounded-xl text-sm hover:bg-neutral-50">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-50 bg-neutral-50">
                        {["Order ID", "Customer", "Product", "Date", "Status", "Total", "Actions"].map((h) => (
                          <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_ORDERS.map((order) => {
                        const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
                        return (
                          <tr key={order.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                            <td className="px-6 py-4 text-sm">{order.customer}</td>
                            <td className="px-6 py-4 text-sm text-neutral-600">{order.product}</td>
                            <td className="px-6 py-4 text-sm text-neutral-500">{order.date}</td>
                            <td className="px-6 py-4">
                              <select
                                defaultValue={order.status}
                                className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer ${status.color}`}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-sm font-bold">{formatPrice(order.total)}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1">
                                <button className="p-1.5 hover:bg-neutral-100 rounded-lg">
                                  <Eye className="w-4 h-4 text-neutral-500" />
                                </button>
                                <button className="p-1.5 hover:bg-blue-50 rounded-lg">
                                  <Download className="w-4 h-4 text-neutral-500" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Customers Section */}
          {activeSection === "customers" && (
            <div className="space-y-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50">
                        {["Customer", "Email", "Orders", "Total Spent", "Joined", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer, i) => (
                        <tr key={i} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm flex-none">
                                {customer.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <span className="text-sm font-medium">{customer.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-600">{customer.email}</td>
                          <td className="px-6 py-4 text-sm font-medium">{customer.orders}</td>
                          <td className="px-6 py-4 text-sm font-bold">{formatPrice(customer.spent)}</td>
                          <td className="px-6 py-4 text-sm text-neutral-500">{customer.joined}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${customer.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                              {customer.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 hover:bg-neutral-100 rounded-lg">
                                <Eye className="w-4 h-4 text-neutral-500" />
                              </button>
                              <button className="p-1.5 hover:bg-red-50 rounded-lg">
                                <Trash2 className="w-4 h-4 text-neutral-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeSection === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                  <h3 className="font-bold mb-6">Revenue Overview</h3>
                  <BarChart data={monthlyData} />
                </div>
                <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                  <h3 className="font-bold mb-6">Category Performance</h3>
                  <div className="space-y-4">
                    {CATEGORIES.map((cat) => {
                      const pct = Math.floor(Math.random() * 80) + 20;
                      return (
                        <div key={cat.id}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="font-medium">{cat.name}</span>
                            <span className="text-neutral-500">{pct}%</span>
                          </div>
                          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-black rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Conversion Rate", value: "3.24%", icon: TrendingUp, color: "text-emerald-600" },
                  { label: "Avg. Order Value", value: "$1,240", icon: CreditCard, color: "text-blue-600" },
                  { label: "Return Rate", value: "2.1%", icon: Tag, color: "text-amber-600" },
                  { label: "Avg. Rating", value: "4.8★", icon: Star, color: "text-purple-600" },
                ].map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={kpi.label} className="bg-white rounded-2xl border border-neutral-100 p-5 text-center">
                      <Icon className={`w-6 h-6 ${kpi.color} mx-auto mb-2`} />
                      <div className="text-2xl font-black">{kpi.value}</div>
                      <div className="text-xs text-neutral-500 mt-1">{kpi.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Settings */}
          {activeSection === "settings" && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                <h3 className="font-bold text-lg mb-5">Store Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: "Store Name", value: "Luxora" },
                    { label: "Support Email", value: "hello@luxora.com" },
                    { label: "Currency", value: "USD ($)" },
                    { label: "Tax Rate (%)", value: "8.5" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">{field.label}</label>
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-neutral-800 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
