"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { ImagePlaceholder } from "@/app/components/image-placeholder";
import { formatPrice } from "@/app/lib/products";
import { useCart, type ResolvedCartItem } from "@/app/components/cart/cart-context";

export function CartItemRow({
  item,
  compact = false,
}: {
  item: ResolvedCartItem;
  compact?: boolean;
}) {
  const { setQuantity, removeItem } = useCart();
  const Icon = item.product.icon;

  return (
    <div className="flex gap-3">
      <ImagePlaceholder
        icon={Icon}
        className={`flex-shrink-0 rounded-xl ${compact ? "h-16 w-16" : "h-24 w-24"}`}
      />
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-blue-600 uppercase">
              {item.product.category}
            </p>
            <h3
              className={`font-semibold text-slate-900 ${compact ? "text-sm" : "text-base"}`}
            >
              {item.product.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            aria-label={`Eliminar ${item.product.name} del carrito`}
            className="flex-shrink-0 text-slate-400 transition-colors hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setQuantity(item.productId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label={`Disminuir cantidad de ${item.product.name}`}
              className="flex h-7 w-7 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-30"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-slate-900">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(item.productId, item.quantity + 1)}
              disabled={item.quantity >= 99}
              aria-label={`Aumentar cantidad de ${item.product.name}`}
              className="flex h-7 w-7 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-30"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-sm font-semibold text-slate-900">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
