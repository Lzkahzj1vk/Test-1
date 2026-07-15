import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import ProductSlider from "@/components/products/ProductSlider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />

      {/* Best Sellers Slider */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6">
        <ProductSlider
          title="Best Sellers"
          subtitle="Most loved by our customers"
          filter="best"
        />
      </section>

      {/* New Arrivals Slider */}
      <section className="py-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ProductSlider
            title="New Arrivals"
            subtitle="Fresh designs just landed"
            filter="new"
          />
        </div>
      </section>

      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
