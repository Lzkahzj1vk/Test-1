import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const filter = searchParams.get("filter");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "featured";
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "99999");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  let filtered = [...PRODUCTS];

  if (category) {
    filtered = filtered.filter((p) => p.categorySlug === category);
  }

  if (filter === "new") {
    filtered = filtered.filter((p) => p.isNewArrival);
  } else if (filter === "best") {
    filtered = filtered.filter((p) => p.isBestSeller);
  } else if (filter === "featured") {
    filtered = filtered.filter((p) => p.isFeatured);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  filtered = filtered.filter(
    (p) => p.price >= minPrice && p.price <= maxPrice
  );

  switch (sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      break;
    default:
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    products: paginated,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  });
}
