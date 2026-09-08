"use client";

import { Eye, Heart, Scale, ShoppingCart } from "lucide-react";
import { ProductImage } from "@/app/components/product-image";
import { useCart } from "@/app/components/cart/cart-context";
import { formatPrice, PRODUCTS } from "@/app/lib/products";

const QUICK_ACTIONS = [
  { icon: Heart, label: "Añadir a favoritos" },
  { icon: Scale, label: "Comparar" },
  { icon: Eye, label: "Vista rápida" },
];

export function ProductCard({
  productId,
  view = "grid",
}: {
  productId: string;
  view?: "grid" | "list";
}) {
  const { addItem } = useCart();
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) return null;

  const handleAdd = () => addItem(product, 1);

  if (view === "list") {
    return (
      <div className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-lg hover:shadow-slate-200/60">
        <ProductImage
          product={product}
          className="h-28 w-28 flex-shrink-0 rounded-xl"
        />
        <div className="flex flex-1 flex-col justify-center gap-1">
          <p className="text-xs font-medium tracking-wide text-blue-800 uppercase">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-slate-900">
            {product.name}
          </h3>
          <div className="mt-1 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-900">
              {formatPrice(product.price)}
            </span>
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#fed207] px-3.5 py-1.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-[#e6b800]"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Añadir
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg hover:shadow-slate-200/60">
      <div className="relative">
        <ProductImage product={product} className="aspect-square w-full" />
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          {QUICK_ACTIONS.map(({ icon: ActionIcon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition-colors hover:bg-[#fed207] hover:text-slate-900"
            >
              <ActionIcon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-medium tracking-wide text-blue-800 uppercase">
          {product.category}
        </p>
        <h3 className="mt-1 text-sm font-semibold text-balance text-slate-900">
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-slate-900">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Añadir ${product.name} al carrito`}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#fed207] px-3.5 py-1.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-[#e6b800]"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
