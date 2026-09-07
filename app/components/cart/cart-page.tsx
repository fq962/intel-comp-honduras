"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/components/cart/cart-context";
import { CartItemRow } from "@/app/components/cart/cart-item-row";
import { OrderSummary } from "@/app/components/cart/order-summary";

function Breadcrumb() {
  return (
    <div className="border-b border-slate-100 bg-slate-50">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-800">
          Inicio
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-900">Carrito</span>
      </div>
    </div>
  );
}

export function CartPage() {
  const { resolvedItems, subtotal, shipping, total } = useCart();

  if (resolvedItems.length === 0) {
    return (
      <div className="bg-white">
        <Breadcrumb />
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-24 text-center">
          <ShoppingCart className="h-12 w-12 text-slate-300" />
          <h1 className="text-2xl font-bold text-slate-900">
            Tu carrito está vacío
          </h1>
          <p className="max-w-md text-slate-600">
            Explora nuestro catálogo y encuentra la tecnología, mobiliario y
            sistemas de seguridad que tu empresa necesita.
          </p>
          <Link
            href="/productos"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
          >
            Ver productos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Breadcrumb />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Carrito de compras
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          {resolvedItems.length}{" "}
          {resolvedItems.length === 1 ? "producto" : "productos"} en tu
          carrito.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-slate-100 border-y border-slate-100">
            {resolvedItems.map((item) => (
              <div key={item.productId} className="py-6">
                <CartItemRow item={item} />
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 p-6">
            <h2 className="text-base font-semibold text-slate-900">
              Resumen del pedido
            </h2>
            <div className="mt-4">
              <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
            </div>
            <Link
              href="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              Proceder al pago
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/productos"
              className="mt-3 block text-center text-sm font-semibold text-blue-800 hover:text-blue-900"
            >
              Seguir comprando
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
