import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

const HIGHLIGHTS = [
  { label: "Computadoras de alto rendimiento", className: "bg-slate-900 text-white" },
  { label: "Mobiliario para restaurantes", className: "bg-blue-700 text-white" },
  { label: "Sillas de auditorio e iglesia", className: "bg-red-500 text-white" },
  { label: "Sistemas de seguridad", className: "bg-[#fed207] text-slate-900" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-100 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -left-10 -z-10 h-40 w-40 rounded-full bg-blue-600/70 blur-2xl"
          />
          <div
            aria-hidden
            className="animate-pop-in absolute -top-6 -left-6 h-16 w-16 rounded-full bg-blue-600"
            style={{ animationDelay: "500ms" }}
          />
          <div
            aria-hidden
            className="animate-pop-in absolute -bottom-8 -right-4 h-24 w-24 rounded-full bg-red-500/90"
            style={{ animationDelay: "650ms" }}
          />

          <div className="animate-photo-in relative aspect-square w-full overflow-hidden rounded-full border-[10px] border-[#fed207] shadow-xl shadow-slate-900/10">
            <Image
              src="/assets/slider_1_mujer.png"
              alt="Profesional revisando su tablet en la oficina"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 480px, 90vw"
            />
          </div>
        </div>

        <div>
          <h1 className="animate-fade-up text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Lo que necesites para tu empresa está aquí
          </h1>

          <ul className="mt-7 flex flex-col gap-3">
            {HIGHLIGHTS.map(({ label, className }, index) => (
              <li key={label}>
                <span
                  className={`animate-fade-up inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-center text-base font-semibold sm:w-auto sm:justify-start ${className}`}
                  style={{ animationDelay: `${180 + index * 110}ms` }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "680ms" }}
          >
            <Link
              href="/productos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-colors hover:bg-red-600"
            >
              Productos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Hablar con un asesor
            </Link>
          </div>

          <div
            className="animate-fade-up mt-8 flex items-center gap-2 text-sm text-slate-500"
            style={{ animationDelay: "800ms" }}
          >
            <ShieldCheck className="h-4 w-4 text-[#8a6f00]" />
            Garantía y devolución de 30 días en todos nuestros productos
          </div>
        </div>
      </div>
    </section>
  );
}
