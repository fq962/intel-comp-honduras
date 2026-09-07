"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Menu, Phone, X } from "lucide-react";
import { CartButton } from "@/app/components/cart/cart-button";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#soporte", label: "Soporte" },
  { href: "/#contacto", label: "Contáctanos" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="hidden border-b border-slate-100 bg-slate-900 text-slate-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6">
            <a
              href="mailto:contacto@intelcomphonduras.com"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              contacto@intelcomphonduras.com
            </a>
            <a
              href="tel:+50433969706"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              (504) 3396-9706
            </a>
          </div>
          <p>Lun – Sáb: 8:00 am – 5:00 pm</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="Intelcomp Honduras"
            width={200}
            height={80}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />

          <Link
            href="/#contacto"
            className="hidden items-center gap-1.5 rounded-full bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-800/20 transition-colors hover:bg-blue-900 md:inline-flex"
          >
            Solicitar cotización
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 md:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Solicitar cotización
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
