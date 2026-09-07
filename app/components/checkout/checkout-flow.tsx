"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Info,
  Loader2,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  useCart,
  type ResolvedCartItem,
} from "@/app/components/cart/cart-context";
import { OrderSummary } from "@/app/components/cart/order-summary";
import { formatPrice } from "@/app/lib/products";

type PaymentMethod = "tarjeta" | "contra-entrega";

type OrderSnapshot = {
  items: ResolvedCartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: PaymentMethod;
};

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return (digits.match(/.{1,4}/g) ?? []).join(" ");
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function Breadcrumb() {
  return (
    <div className="border-b border-slate-100 bg-slate-50">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-800">
          Inicio
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/carrito" className="hover:text-blue-800">
          Carrito
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-900">Checkout</span>
      </div>
    </div>
  );
}

export function CheckoutFlow() {
  const { resolvedItems, subtotal, shipping, total, clearCart } = useCart();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("tarjeta");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [processing, setProcessing] = useState(false);
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(null);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (!orderSnapshot && resolvedItems.length === 0) {
      router.replace("/carrito");
    }
  }, [orderSnapshot, resolvedItems.length, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (processing) return;

    setOrderSnapshot({
      items: resolvedItems,
      subtotal,
      shipping,
      total,
      fullName,
      email,
      phone,
      paymentMethod,
    });
    setProcessing(true);

    setTimeout(() => {
      setOrderId(`IC-${Math.floor(100000 + Math.random() * 900000)}`);
      setProcessing(false);
      clearCart();
    }, 1600);
  };

  if (orderSnapshot && orderId) {
    return (
      <div className="bg-white">
        <Breadcrumb />
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-9 w-9" />
            </span>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
              ¡Pedido confirmado!
            </h1>
            <p className="mt-3 text-slate-600">
              Tu número de pedido es{" "}
              <span className="font-semibold text-slate-900">#{orderId}</span>
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Te contactaremos al {orderSnapshot.phone || orderSnapshot.email}{" "}
              para coordinar la entrega.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-900">
              <Info className="h-3.5 w-3.5" />
              Modo de demostración: no se realizó ningún cargo real
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 p-6">
            <h2 className="text-base font-semibold text-slate-900">
              Resumen del pedido
            </h2>
            <ul className="mt-4 space-y-3 border-b border-slate-100 pb-4 text-sm">
              {orderSnapshot.items.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-slate-600">
                    {item.product.name}{" "}
                    <span className="text-slate-400">× {item.quantity}</span>
                  </span>
                  <span className="flex-shrink-0 font-medium text-slate-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <OrderSummary
                subtotal={orderSnapshot.subtotal}
                shipping={orderSnapshot.shipping}
                total={orderSnapshot.total}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              Volver al inicio
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (resolvedItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white">
      <Breadcrumb />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Checkout
        </h1>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-800">
          <Info className="h-3.5 w-3.5" />
          Checkout de demostración: no se procesan pagos reales ni se
          almacenan datos de tarjeta.
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            className="space-y-10"
          >
            <fieldset disabled={processing} className="space-y-10">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Información de contacto y envío
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">
                      Nombre completo
                    </span>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
                      placeholder="Nombre y apellido"
                    />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Correo electrónico
                    </span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
                      placeholder="correo@ejemplo.com"
                    />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Teléfono
                    </span>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
                      placeholder="(504) 0000-0000"
                    />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="text-sm font-medium text-slate-700">
                      Dirección
                    </span>
                    <input
                      required
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
                      placeholder="Calle, colonia, referencia"
                    />
                  </label>
                  <label>
                    <span className="text-sm font-medium text-slate-700">
                      Ciudad
                    </span>
                    <input
                      required
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
                      placeholder="San Pedro Sula"
                    />
                  </label>
                </div>
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Método de pago
                </h2>
                <div className="mt-4 space-y-3">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                      paymentMethod === "tarjeta"
                        ? "border-blue-600 bg-blue-50/50"
                        : "border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value="tarjeta"
                      checked={paymentMethod === "tarjeta"}
                      onChange={() => setPaymentMethod("tarjeta")}
                      className="h-4 w-4 accent-blue-800"
                    />
                    <CreditCard className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-800">
                      Tarjeta de crédito o débito
                    </span>
                  </label>

                  {paymentMethod === "tarjeta" && (
                    <div className="grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                      <label className="sm:col-span-2">
                        <span className="text-sm font-medium text-slate-700">
                          Nombre en la tarjeta
                        </span>
                        <input
                          required={paymentMethod === "tarjeta"}
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
                          placeholder="Como aparece en la tarjeta"
                        />
                      </label>
                      <label className="sm:col-span-2">
                        <span className="text-sm font-medium text-slate-700">
                          Número de tarjeta
                        </span>
                        <input
                          required={paymentMethod === "tarjeta"}
                          type="text"
                          inputMode="numeric"
                          value={cardNumber}
                          onChange={(e) =>
                            setCardNumber(formatCardNumber(e.target.value))
                          }
                          pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                          maxLength={19}
                          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
                          placeholder="0000 0000 0000 0000"
                        />
                      </label>
                      <label>
                        <span className="text-sm font-medium text-slate-700">
                          Vencimiento
                        </span>
                        <input
                          required={paymentMethod === "tarjeta"}
                          type="text"
                          inputMode="numeric"
                          value={cardExpiry}
                          onChange={(e) =>
                            setCardExpiry(formatExpiry(e.target.value))
                          }
                          pattern="[0-9]{2}/[0-9]{2}"
                          maxLength={5}
                          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
                          placeholder="MM/AA"
                        />
                      </label>
                      <label>
                        <span className="text-sm font-medium text-slate-700">
                          CVV
                        </span>
                        <input
                          required={paymentMethod === "tarjeta"}
                          type="text"
                          inputMode="numeric"
                          value={cardCvv}
                          onChange={(e) =>
                            setCardCvv(
                              e.target.value.replace(/\D/g, "").slice(0, 3),
                            )
                          }
                          pattern="[0-9]{3}"
                          maxLength={3}
                          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
                          placeholder="123"
                        />
                      </label>
                    </div>
                  )}

                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                      paymentMethod === "contra-entrega"
                        ? "border-blue-600 bg-blue-50/50"
                        : "border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value="contra-entrega"
                      checked={paymentMethod === "contra-entrega"}
                      onChange={() => setPaymentMethod("contra-entrega")}
                      className="h-4 w-4 accent-blue-800"
                    />
                    <Truck className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-800">
                      Pago contra entrega
                    </span>
                  </label>
                  {paymentMethod === "contra-entrega" && (
                    <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      Pagarás en efectivo o con tarjeta (POS) al recibir tu
                      pedido.
                    </p>
                  )}
                </div>
              </div>
            </fieldset>
          </form>

          <aside className="h-fit rounded-2xl border border-slate-200 p-6">
            <h2 className="text-base font-semibold text-slate-900">
              Resumen del pedido
            </h2>
            <ul className="mt-4 space-y-2 border-b border-slate-100 pb-4 text-sm">
              {resolvedItems.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-slate-600">
                    {item.product.name}{" "}
                    <span className="text-slate-400">× {item.quantity}</span>
                  </span>
                  <span className="flex-shrink-0 font-medium text-slate-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={processing}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Procesando pago...
                </>
              ) : (
                <>
                  Confirmar pedido
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Simulación de pago — no se realizan cargos reales
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
