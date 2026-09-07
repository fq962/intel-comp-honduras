import type { Metadata } from "next";
import { CheckoutFlow } from "@/app/components/checkout/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout | Intelcomp Honduras",
  description: "Finaliza tu compra de forma segura.",
};

export default function Page() {
  return <CheckoutFlow />;
}
