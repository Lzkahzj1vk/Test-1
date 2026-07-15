import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Luxora — Premium Furniture Store",
    template: "%s | Luxora",
  },
  description:
    "Discover premium luxury furniture for your dream home. Shop sofas, beds, dining tables, chairs, and modern home décor at Luxora.",
  keywords: ["luxury furniture", "premium furniture", "modern furniture", "home decor", "sofas", "beds"],
  openGraph: {
    title: "Luxora — Premium Furniture Store",
    description: "Discover premium luxury furniture for your dream home.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <WishlistProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#fff",
                  color: "#000",
                  border: "1px solid #e5e5e5",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                },
              }}
            />
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
