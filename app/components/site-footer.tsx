import Image from "next/image";
import { Mail, MapPin, Phone, Rss } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/app/components/social-icons";

const SUPPORT_LINKS = [
  "Nosotros",
  "Marcas",
  "Términos y condiciones",
  "Política de privacidad",
  "Todos los productos",
];

const CUSTOMER_LINKS = [
  "Noticias",
  "Nosotros",
  "Preguntas frecuentes",
  "Centros de distribución",
];

const SOCIAL_LINKS = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: Rss, label: "RSS" },
];

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="inline-flex rounded-lg bg-white p-2">
              <Image
                src="/assets/logo.png"
                alt="Intelcomp Honduras"
                width={200}
                height={80}
                className="h-12 w-auto"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Tecnología, mobiliario y sistemas de seguridad de alta calidad
              para equipar tu empresa, con soporte experto en todo el país.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-[#fed207] hover:text-slate-900"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Soporte</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {SUPPORT_LINKS.map((label) => (
                <li key={label}>
                  <a href="#" className="text-slate-400 hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Atención al cliente
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {CUSTOMER_LINKS.map((label) => (
                <li key={label}>
                  <a href="#" className="text-slate-400 hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#fed207]" />
                <span>
                  1ra Calle, 5 y 6 avenida N.E, Col. Smith, Plaza Kronos
                  Local N.2, San Pedro Sula
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="h-4 w-4 flex-shrink-0 text-[#fed207]" />
                <span>(504) 2553-9541 · (504) 3396-9706</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#fed207]" />
                <span>contacto@intelcomphonduras.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-slate-500 sm:flex-row">
          <p>
            Copyright © {new Date().getFullYear()} Intelcomp Honduras. Todos
            los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">
              Términos y condiciones
            </a>
            <a href="#" className="hover:text-slate-300">
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
