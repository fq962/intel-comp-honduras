import { Categories } from "@/app/components/home/categories";
import { CtaBand } from "@/app/components/home/cta-band";
import { FeaturedProducts } from "@/app/components/home/featured-products";
import { Hero } from "@/app/components/home/hero";
import { Testimonial } from "@/app/components/home/testimonial";
import { TrustStrip } from "@/app/components/home/trust-strip";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Categories />
      <FeaturedProducts />
      <Testimonial />
      <CtaBand />
    </>
  );
}
