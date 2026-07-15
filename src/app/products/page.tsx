"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, List, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/SkeletonCard";
import { CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  category: string;
  categorySlug: string;
  colors?: string[];
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const MATERIALS = ["Velvet", "Leather", "Oak", "Marble", "Steel", "Boucle", "Walnut"];
const BRANDS = ["LuxCraft", "EliteHome", "ComfortPro", "SleepLux"];

function FilterSection({ title, children, defaultOpen = true }: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-100 pb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-black"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Filters
  const [sort, setSort] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const cat = searchParams.get("category");
    const filter = searchParams.get("filter");
    const search = searchParams.get("search");
    if (cat) setSelectedCategory(cat);
    if (search) setSearchInput(search);
    if (filter === "new" || filter === "best" || filter === "featured") {
      // handled via API
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, sort, page, priceRange, minRating]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const filter = searchParams.get("filter") || "";
      const search = searchInput || searchParams.get("search") || "";
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        sort,
        minPrice: priceRange[0].toString(),
        maxPrice: priceRange[1].toString(),
      });
      if (selectedCategory) params.set("category", selectedCategory);
      if (filter) params.set("filter", filter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const toggleMaterial = (m: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedMaterials([]);
    setSelectedBrands([]);
    setPriceRange([0, 5000]);
    setMinRating(0);
    setSearchInput("");
    setPage(1);
  };

  const hasActiveFilters =
    selectedCategory || selectedMaterials.length > 0 || selectedBrands.length > 0 ||
    priceRange[0] > 0 || priceRange[1] < 5000 || minRating > 0;

  const Sidebar = (
    <div className="space-y-2">
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm text-red-500 font-medium hover:text-red-600 mb-4"
        >
          <X className="w-4 h-4" />
          Clear All Filters
        </button>
      )}

      {/* Category */}
      <FilterSection title="Category">
        <div className="space-y-2">
          <button
            onClick={() => { setSelectedCategory(""); setPage(1); }}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              !selectedCategory ? "bg-black text-white" : "hover:bg-neutral-50 text-neutral-700"
            )}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm flex justify-between transition-colors",
                selectedCategory === cat.slug
                  ? "bg-black text-white"
                  : "hover:bg-neutral-50 text-neutral-700"
              )}
            >
              {cat.name}
              <span className={selectedCategory === cat.slug ? "text-white/60" : "text-neutral-400"}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price Range">
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-neutral-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={5000}
            step={100}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-black"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-full border border-neutral-200 rounded-lg px-3 py-1.5 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
              className="w-full border border-neutral-200 rounded-lg px-3 py-1.5 text-sm"
            />
          </div>
        </div>
      </FilterSection>

      {/* Material */}
      <FilterSection title="Material" defaultOpen={false}>
        <div className="space-y-2">
          {MATERIALS.map((m) => (
            <label key={m} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(m)}
                onChange={() => toggleMaterial(m)}
                className="rounded accent-black"
              />
              <span className="text-sm text-neutral-700">{m}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand" defaultOpen={false}>
        <div className="space-y-2">
          {BRANDS.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="rounded accent-black"
              />
              <span className="text-sm text-neutral-700">{b}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Minimum Rating" defaultOpen={false}>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r === minRating ? 0 : r)}
              className={cn(
                "flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm transition-colors",
                minRating === r ? "bg-black text-white" : "hover:bg-neutral-50"
              )}
            >
              <span>{"★".repeat(r)}{"☆".repeat(5 - r)}</span>
              <span>& up</span>
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-black">
          {selectedCategory
            ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name || "Products"
            : "All Products"}
        </h1>
        <p className="text-neutral-500 mt-1">{total} products found</p>
      </div>

      {/* Search + Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </form>

        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-neutral-200 rounded-xl text-sm font-medium hover:bg-neutral-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="px-4 py-2.5 border border-neutral-200 rounded-xl text-sm bg-white focus:outline-none focus:border-black cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* View toggle */}
          <div className="hidden sm:flex items-center border border-neutral-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "grid" ? "bg-black text-white" : "hover:bg-neutral-50"
              )}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "list" ? "bg-black text-white" : "hover:bg-neutral-50"
              )}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          {Sidebar}
        </aside>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              {Sidebar}
            </div>
          </div>
        )}

        {/* Products */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className={cn(
              "grid gap-6",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
            )}>
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛋️</div>
              <h3 className="text-xl font-bold text-black mb-2">No products found</h3>
              <p className="text-neutral-500 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={clearFilters}
                className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-neutral-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              )}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-neutral-200 rounded-xl text-sm font-medium hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(pages, 5) }).map((_, i) => {
                    const p = i + 1;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={cn(
                          "w-10 h-10 rounded-xl text-sm font-medium transition-colors",
                          page === p ? "bg-black text-white" : "border border-neutral-200 hover:bg-neutral-50"
                        )}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage((p) => Math.min(pages, p + 1))}
                    disabled={page === pages}
                    className="px-4 py-2 border border-neutral-200 rounded-xl text-sm font-medium hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
