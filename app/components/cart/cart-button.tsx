"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/components/cart/cart-context";

export function CartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Abrir carrito de compras"
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-semibold text-white">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}
