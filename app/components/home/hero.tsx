import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-100 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-indigo-50 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-900">
            <Sparkles className="h-3.5 w-3.5" />
            Distribuidor autorizado en Honduras
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Todo lo que tu empresa necesita, en un solo lugar
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
            Tecnología, mobiliario y sistemas de seguridad de alta calidad,
            con soporte experto y entrega en toda Honduras.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-800 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-800/25 transition-colors hover:bg-blue-900"
            >
              Ver productos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Hablar con un asesor
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="h-4 w-4 text-blue-800" />
            Garantía y devolución de 30 días en todos nuestros productos
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <Image
            src="/assets/slider_1_mujer.png"
            alt="Profesional revisando su tablet en la oficina"
            fill
            priority
            className="object-contain"
            sizes="(min-width: 768px) 480px, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
