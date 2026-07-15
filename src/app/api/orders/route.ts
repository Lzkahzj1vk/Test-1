import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

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

    const [order] = await db
      .insert(orders)
      .values({
        customerName,
        customerEmail,
        items,
        subtotal: subtotal.toString(),
        shipping: shipping.toString(),
        total: total.toString(),
        shippingAddress,
        paymentMethod,
        status: "pending",
      })
      .returning();

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allOrders = await db.select().from(orders).orderBy(orders.createdAt);
    return NextResponse.json({ orders: allOrders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
