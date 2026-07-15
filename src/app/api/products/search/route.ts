import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!q || q.length < 2) {
    return NextResponse.json({ products: [] });
  }

  const query = q.toLowerCase();
  const results = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.material.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query))
  ).slice(0, limit);

  return NextResponse.json({ products: results });
}
