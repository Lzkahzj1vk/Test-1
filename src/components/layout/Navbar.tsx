"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORIES } from "@/lib/data";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/products", hasDropdown: true },
  { label: "New Arrivals", href: "/products?filter=new" },
  { label: "Best Sellers", href: "/products?filter=best" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof import("@/lib/data").PRODUCTS>([]);
  const [catDropdown, setCatDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (q.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}&limit=5`);
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100"
            : "bg-white/90 backdrop-blur-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">L</span>
              </div>
              <span className="font-black text-xl tracking-tight text-black">
                LUXORA
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setCatDropdown(true)}
                    onMouseLeave={() => setCatDropdown(false)}
                  >
                    <button className="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-black transition-colors">
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          catDropdown && "rotate-180"
                        )}
                      />
                    </button>
                    {catDropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-4 w-64">
                          {CATEGORIES.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/products?category=${cat.slug}`}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                              onClick={() => setCatDropdown(false)}
                            >
                              <span className="text-sm font-medium text-neutral-700 group-hover:text-black">
                                {cat.name}
                              </span>
                              <span className="ml-auto text-xs text-neutral-400">
                                {cat.count}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-neutral-700 hover:text-black transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              )}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                {searchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-100 p-3">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="flex items-center gap-2 border border-neutral-200 rounded-xl px-3 py-2">
                        <Search className="w-4 h-4 text-neutral-400" />
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search products..."
                          className="flex-1 text-sm outline-none bg-transparent"
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                          >
                            <X className="w-4 h-4 text-neutral-400" />
                          </button>
                        )}
                      </div>
                    </form>
                    {searchResults.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-50 transition-colors"
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                              <p className="text-xs text-neutral-500">${product.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchQuery.length >= 2 && searchResults.length === 0 && (
                      <p className="text-sm text-neutral-400 text-center py-4">No results found</p>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden md:flex p-2 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Mobile Menu */}
              <button
                className="lg:hidden p-2 rounded-full hover:bg-neutral-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-neutral-100 shadow-xl">
            <div className="p-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-neutral-100 mt-2">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <User className="w-4 h-4" />
                  My Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
