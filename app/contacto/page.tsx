import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ContactForm } from "@/app/components/contact/contact-form";
import { ContactInfo } from "@/app/components/contact/contact-info";

export const metadata: Metadata = {
  title: "Contáctanos | Intelcomp Honduras",
  description:
    "Escríbenos, llámanos o visítanos. Cuéntanos en qué podemos ayudarte.",
};

export default function ContactoPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-800">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-900">Contáctanos</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Contáctanos
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Cuéntanos en qué podemos ayudarte. Nuestro equipo te responderá lo
          antes posible.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
