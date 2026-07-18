export const dynamic = 'force-dynamic'
export const runtime = 'edge'

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
      paymentMethod,
    } = body;

    // مثال: حفظ الطلب في Cloudflare D1
    // const result = await env.DB.prepare(
    //   "INSERT INTO orders (customer_name, customer_email, items, subtotal, shipping, total, shipping_address, payment_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    // ).bind(customerName, customerEmail, JSON.stringify(items), subtotal, shipping, total, JSON.stringify(shippingAddress), paymentMethod, 'pending').run();

    // للآن: إرجاع استجابة ناجحة فقط
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      customerName,
      customerEmail,
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
      paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // مثال: جلب جميع الطلبات من Cloudflare D1
    // const result = await env.DB.prepare(
    //   "SELECT * FROM orders ORDER BY created_at DESC"
    // ).all();
    // const allOrders = result.results || [];

    // للآن: إرجاع مصفوفة فارغة
    return NextResponse.json({ orders: [] });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}