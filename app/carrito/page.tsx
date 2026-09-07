import type { Metadata } from "next";
import { CartPage } from "@/app/components/cart/cart-page";

export const metadata: Metadata = {
  title: "Carrito de compras | Intelcomp Honduras",
  description: "Revisa los productos en tu carrito antes de finalizar tu compra.",
};

export default function Page() {
  return <CartPage />;
}
