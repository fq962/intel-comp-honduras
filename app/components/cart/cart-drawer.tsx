"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/app/components/cart/cart-context";
import { CartItemRow } from "@/app/components/cart/cart-item-row";
import { formatPrice } from "@/app/lib/products";

export function CartDrawer() {
  const { resolvedItems, isOpen, closeCart, subtotal } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-slate-900/40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Carrito de compras
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {resolvedItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingCart className="h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate-500">Tu carrito está vacío.</p>
            <Link
              href="/productos"
              onClick={closeCart}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              {resolvedItems.map((item) => (
                <CartItemRow key={item.productId} item={item} compact />
              ))}
            </div>

            <div className="border-t border-slate-100 px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Envío calculado en el checkout.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Finalizar compra
                </Link>
                <Link
                  href="/carrito"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Ver carrito completo
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
