import { Clock, CreditCard, RotateCcw, Truck, type LucideIcon } from "lucide-react";

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Truck,
    title: "Envío a todo el país",
    description:
      "Coordinamos la entrega de tu pedido, con condiciones especiales para mayoristas.",
  },
  {
    icon: RotateCcw,
    title: "Garantía y devoluciones",
    description:
      "30 días de plazo para devolución y garantía en la mayoría de nuestros productos.",
  },
  {
    icon: Clock,
    title: "Pedidos 24/7",
    description:
      "Cotiza y realiza tus pedidos en línea a cualquier hora del día.",
  },
  {
    icon: CreditCard,
    title: "Pagos 100% seguros",
    description:
      "Múltiples métodos de pago con procesos protegidos y confiables.",
  },
];

export function TrustStrip() {
  return (
    <section id="servicios" className="border-y border-slate-100 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-800/10 text-blue-800">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
            <p className="text-sm leading-6 text-slate-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
