import { ClipboardCheck, PackageCheck, Search, Wrench, type LucideIcon } from "lucide-react";

const STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Search,
    title: "1. Diagnóstico",
    description: "Evaluamos tu equipo y te explicamos qué necesita.",
  },
  {
    icon: ClipboardCheck,
    title: "2. Cotización",
    description: "Te damos un precio claro antes de iniciar el trabajo.",
  },
  {
    icon: Wrench,
    title: "3. Reparación",
    description: "Nuestros técnicos realizan el servicio con repuestos de calidad.",
  },
  {
    icon: PackageCheck,
    title: "4. Entrega",
    description: "Recibes tu equipo probado y listo para usar.",
  },
];

export function ProcessSteps() {
  return (
    <section className="border-y border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          ¿Cómo funciona?
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fed207]/15 text-[#8a6f00]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
              <p className="text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
