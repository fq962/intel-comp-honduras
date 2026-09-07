import { formatPrice } from "@/app/lib/products";
import { FREE_SHIPPING_THRESHOLD } from "@/app/components/cart/cart-context";

export function OrderSummary({
  subtotal,
  shipping,
  total,
}: {
  subtotal: number;
  shipping: number;
  total: number;
}) {
  return (
    <div>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">Subtotal</dt>
          <dd className="font-medium text-slate-900">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Envío</dt>
          <dd className="font-medium text-slate-900">
            {shipping === 0 ? "Gratis" : formatPrice(shipping)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-slate-100 pt-3 text-base">
          <dt className="font-semibold text-slate-900">Total</dt>
          <dd className="font-semibold text-slate-900">{formatPrice(total)}</dd>
        </div>
      </dl>

      {shipping > 0 && (
        <p className="mt-3 text-xs text-slate-500">
          Envío gratis en pedidos mayores a{" "}
          {formatPrice(FREE_SHIPPING_THRESHOLD)}.
        </p>
      )}
    </div>
  );
}
