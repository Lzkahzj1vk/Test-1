"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Share2,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Package,
} from "lucide-react";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import ProductSlider from "@/components/products/ProductSlider";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS } from "@/lib/data";
import toast from "react-hot-toast";

const TABS = ["Description", "Specifications", "Reviews", "Shipping"];

const REVIEWS_MOCK = [
  { id: 1, name: "Sarah M.", rating: 5, date: "Jan 15, 2025", comment: "Absolutely stunning! The quality exceeded all my expectations.", verified: true },
  { id: 2, name: "John D.", rating: 4, date: "Jan 10, 2025", comment: "Great quality furniture, delivery was prompt and packaging superb.", verified: true },
  { id: 3, name: "Emily R.", rating: 5, date: "Dec 28, 2024", comment: "Perfect for my living room. The color is exactly as shown in photos.", verified: false },
];

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const product = PRODUCTS.find((p) => p.slug === slug);
  const related = product
    ? PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    : [];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [imgZoom, setImgZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = product ? isInWishlist(product.id) : false;
  const inCart = product ? isInCart(product.id) : false;

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedColor(product.colors?.[0] || "");
      setSelectedSize(product.sizes?.[0] || "");
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛋️</div>
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <Link href="/products" className="text-neutral-500 hover:text-black">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.oldPrice
    ? calculateDiscount(product.oldPrice, product.price)
    : null;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.images[0] || product.image,
      quantity,
      slug: product.slug,
      color: selectedColor,
      size: selectedSize,
    });
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      style: { borderRadius: "12px" },
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  const handleWishlist = () => {
    const added = toggleWishlist({
      productId: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.images[0] || product.image,
      slug: product.slug,
      rating: product.rating,
      reviewCount: product.reviewCount,
    });
    toast.success(added ? "Added to wishlist!" : "Removed from wishlist", {
      icon: added ? "❤️" : "💔",
      style: { borderRadius: "12px" },
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-black transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/products?category=${product.categorySlug}`}
            className="hover:text-black transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-black font-medium line-clamp-1">{product.name}</span>
        </nav>
      </div>

      {/* Main Product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative rounded-2xl overflow-hidden bg-neutral-50 aspect-square cursor-zoom-in"
              onMouseEnter={() => setImgZoom(true)}
              onMouseLeave={() => setImgZoom(false)}
              onMouseMove={handleMouseMove}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-200",
                  imgZoom ? "scale-150" : "scale-100"
                )}
                style={imgZoom ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                } : {}}
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discount && discount > 0 && <Badge variant="sale">-{discount}% OFF</Badge>}
                {product.isBestSeller && <Badge variant="hot">Best Seller</Badge>}
                {product.isNewArrival && <Badge variant="new">New Arrival</Badge>}
              </div>
              {/* Share */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied!", { style: { borderRadius: "12px" } });
                }}
                className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-neutral-50"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 right-3 text-xs bg-black/60 text-white px-2 py-1 rounded-md">
                Hover to zoom
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                    selectedImage === i
                      ? "border-black"
                      : "border-transparent hover:border-neutral-300"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="text-neutral-300">•</span>
                <Link
                  href={`/products?category=${product.categorySlug}`}
                  className="text-xs font-semibold text-neutral-400 uppercase tracking-wider hover:text-black"
                >
                  {product.category}
                </Link>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-black leading-tight mb-3">
                {product.name}
              </h1>
              <StarRating
                rating={product.rating}
                size="md"
                showValue
                reviewCount={product.reviewCount}
              />
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-black">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-neutral-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <Badge variant="sale" className="text-sm px-3 py-1">
                    Save {discount}%
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-emerald-600">
                    In Stock ({product.stock} units available)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-sm font-medium text-red-600">Out of Stock</span>
                </>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-black">Color:</span>
                  <span className="text-sm text-neutral-500">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-9 h-9 rounded-full border-2 transition-all relative",
                        selectedColor === color
                          ? "border-black scale-110"
                          : "border-neutral-200 hover:border-neutral-400"
                      )}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    >
                      {selectedColor === color && (
                        <Check className="w-4 h-4 absolute inset-0 m-auto text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-black">Size:</span>
                  <span className="text-sm text-neutral-500">{selectedSize}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-2 border-2 rounded-xl text-sm font-medium transition-all",
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 hover:border-black text-neutral-700"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <span className="text-sm font-semibold text-black block mb-3">Quantity:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-neutral-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2.5 hover:bg-neutral-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2.5 font-bold text-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-4 py-2.5 hover:bg-neutral-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-neutral-500">
                  Max {product.stock} per order
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all",
                  inCart
                    ? "bg-neutral-800 text-white"
                    : "bg-black text-white hover:bg-neutral-800",
                  product.stock === 0 && "opacity-50 cursor-not-allowed"
                )}
              >
                <ShoppingCart className="w-5 h-5" />
                {inCart ? "Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base border-2 border-black hover:bg-neutral-50 transition-all disabled:opacity-50"
              >
                Buy Now
              </button>
              <button
                onClick={handleWishlist}
                className={cn(
                  "w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all",
                  inWishlist
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-neutral-200 hover:border-red-300 hover:text-red-500"
                )}
                aria-label="Add to wishlist"
              >
                <Heart className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Truck, title: "Free Delivery", desc: "On orders over $500" },
                { icon: RotateCcw, title: "30-Day Returns", desc: "Hassle-free returns" },
                { icon: Shield, title: "2-Year Warranty", desc: "Quality guarantee" },
                { icon: Package, title: "Secure Packaging", desc: "Safe delivery" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-3 bg-neutral-50 rounded-xl p-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-black">{item.title}</p>
                      <p className="text-xs text-neutral-500">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-neutral-200 mb-8">
            <div className="flex gap-0 overflow-x-auto scrollbar-hide">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all",
                    activeTab === tab
                      ? "border-black text-black"
                      : "border-transparent text-neutral-500 hover:text-black"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl">
            {activeTab === "Description" && (
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-700 leading-relaxed text-base mb-4">
                  {product.description}
                </p>
                <p className="text-neutral-700 leading-relaxed text-base">
                  Each piece in our collection undergoes rigorous quality testing to ensure it meets our premium standards. We work with master craftsmen who bring decades of experience to every creation, ensuring that your investment stands the test of time.
                </p>
                <ul className="mt-6 space-y-2">
                  {["Premium quality materials", "Handcrafted with attention to detail", "Eco-friendly production process", "Customizable options available", "Expert assembly included"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-neutral-700">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "Specifications" && (
              <div className="space-y-3">
                {[
                  { label: "Material", value: product.material },
                  { label: "Brand", value: product.brand },
                  { label: "Category", value: product.category },
                  { label: "Available Sizes", value: product.sizes?.join(", ") || "Standard" },
                  { label: "Available Colors", value: `${product.colors?.length || 1} options` },
                  { label: "Stock", value: `${product.stock} units` },
                  { label: "Warranty", value: "2 years manufacturer warranty" },
                  { label: "Assembly", value: "Professional assembly included" },
                  { label: "Delivery", value: "7-14 business days" },
                ].map((spec) => (
                  <div key={spec.label} className="flex items-center border-b border-neutral-50 py-3">
                    <span className="text-sm font-semibold text-neutral-500 w-40">{spec.label}</span>
                    <span className="text-sm text-black">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Reviews" && (
              <div className="space-y-6">
                {/* Summary */}
                <div className="flex items-center gap-8 p-6 bg-neutral-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-5xl font-black text-black">{product.rating}</div>
                    <StarRating rating={product.rating} size="sm" className="justify-center mt-1" />
                    <div className="text-xs text-neutral-500 mt-1">{product.reviewCount} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((r) => (
                      <div key={r} className="flex items-center gap-3">
                        <span className="text-xs text-neutral-500 w-3">{r}</span>
                        <Star className="w-3 h-3 text-amber-400" fill="currentColor" />
                        <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${r === 5 ? 70 : r === 4 ? 20 : 5}%` }}
                          />
                        </div>
                        <span className="text-xs text-neutral-400 w-6">
                          {r === 5 ? "70%" : r === 4 ? "20%" : "5%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews list */}
                {REVIEWS_MOCK.map((review) => (
                  <div key={review.id} className="border border-neutral-100 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{review.name}</span>
                            {review.verified && (
                              <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                      </div>
                      <span className="text-xs text-neutral-400">{review.date}</span>
                    </div>
                    <p className="text-sm text-neutral-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Shipping" && (
              <div className="space-y-6">
                {[
                  {
                    title: "Standard Delivery",
                    desc: "7-14 business days",
                    price: "Free on orders over $500",
                    icon: "🚚",
                  },
                  {
                    title: "Express Delivery",
                    desc: "3-5 business days",
                    price: "$49.99",
                    icon: "⚡",
                  },
                  {
                    title: "White Glove Service",
                    desc: "Scheduled delivery + installation",
                    price: "$149.99",
                    icon: "🤝",
                  },
                  {
                    title: "Store Pickup",
                    desc: "Available in 48 hours",
                    price: "Free",
                    icon: "🏪",
                  },
                ].map((option) => (
                  <div key={option.title} className="flex items-center gap-4 p-5 border border-neutral-100 rounded-2xl hover:border-black transition-colors">
                    <span className="text-3xl">{option.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-black">{option.title}</h4>
                      <p className="text-sm text-neutral-500">{option.desc}</p>
                    </div>
                    <span className="font-bold text-black">{option.price}</span>
                  </div>
                ))}
                <div className="bg-neutral-50 rounded-2xl p-5">
                  <h4 className="font-semibold text-black mb-2">Return Policy</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    We offer a 30-day hassle-free return policy on all furniture items. Items must be in original condition and packaging. Contact our support team to initiate a return.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Sliders */}
        {related.length > 0 && (
          <div className="mt-16 space-y-4">
            <ProductSlider
              title="You May Also Like"
              subtitle="Based on your viewing history"
              categorySlug={product.categorySlug}
              excludeId={product.id}
            />
            <ProductSlider
              title="Best Sellers in This Category"
              filter="best"
              categorySlug={product.categorySlug}
              excludeId={product.id}
            />
            <ProductSlider
              title="Customers Also Bought"
              filter="featured"
              excludeId={product.id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
