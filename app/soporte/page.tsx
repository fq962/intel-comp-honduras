import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CtaBand } from "@/app/components/home/cta-band";
import { ProcessSteps } from "@/app/components/support/process-steps";
import { ServicesGrid } from "@/app/components/support/services-grid";

export const metadata: Metadata = {
  title: "Soporte | Intelcomp Honduras",
  description:
    "Servicio técnico para el hogar u oficina: refil de cartuchos, reparación de impresoras, mantenimiento de computadoras e instalación de sistemas de vigilancia.",
};

export default function SoportePage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-800">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-900">Soporte</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Soporte para el hogar u oficina
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          En Intelcomp ofrecemos servicio técnico especializado para mantener
          tus equipos funcionando al 100%, con repuestos de calidad y
          garantía en cada trabajo.
        </p>
      </div>

      <ServicesGrid />
      <ProcessSteps />

      <CtaBand
        title="¿Necesitas soporte técnico?"
        description="Cuéntanos qué le pasa a tu equipo y un técnico te ayudará a resolverlo lo antes posible."
        cta="Solicitar servicio"
      />
    </div>
  );
}
