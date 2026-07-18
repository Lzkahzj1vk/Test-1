export const dynamic = 'force-dynamic'
export const runtime = 'edge'

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // التحقق من صحة البريد الإلكتروني
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // التحقق من تنسيق البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // حفظ البيانات في Cloudflare KV أو D1
    // إذا كنت تستخدم Cloudflare KV:
    // await NEWSLETTER_KV.put(email, JSON.stringify({ email, date: new Date() }));
    
    // أو إذا كنت تستخدم Cloudflare D1:
    // const db = context.env.DB;
    // await db.prepare("INSERT INTO newsletter (email) VALUES (?)").bind(email).run();

    // للآن، سنحفظ البيانات محليًا فقط (يمكنك توصيل قاعدة البيانات لاحقًا)
    const subscribers = [email]; // هذا مثال مؤقت

    return NextResponse.json({ 
      success: true, 
      message: "شكرًا على الاشتراك! تم استقبال بريدك بنجاح",
      email: email 
    }, { status: 200 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ 
      error: "فشل الاشتراك. حاول لاحقًا" 
    }, { status: 500 });
  }
}
