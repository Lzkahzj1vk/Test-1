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
  return NextResponse.json({ orders: [] });
}
