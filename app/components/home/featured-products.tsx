import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/app/components/product-card";
import { PRODUCTS } from "@/app/lib/products";

const FEATURED_CATEGORY_IDS = ["sillas-iglesia", "sillas-restaurante", "mesas"];

const featured = PRODUCTS.filter((p) =>
  FEATURED_CATEGORY_IDS.includes(p.categoryId),
).slice(0, 8);

export function FeaturedProducts() {
  return (
    <section id="mobiliario" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Mobiliario de alta calidad
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Sillas, butacas y mesas resistentes, pensadas para uso
              comercial e institucional.
            </p>
          </div>
          <Link
            href="/productos"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Ver todo el catálogo
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} productId={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
