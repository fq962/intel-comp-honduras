import {
  Armchair,
  ChevronRight,
  Cpu,
  ShieldCheck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ImagePlaceholder } from "@/app/components/image-placeholder";

const CATEGORIES: {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  categoryId: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Sistemas de seguridad",
    description:
      "Cámaras, control de acceso y monitoreo para proteger tu negocio o vivienda.",
    image: "Foto: cámaras de seguridad",
    categoryId: "seguridad",
  },
  {
    icon: Cpu,
    title: "Computadoras de alto rendimiento",
    description:
      "Equipos de cómputo para oficina, diseño y gaming, con garantía oficial.",
    image: "Foto: equipo de cómputo",
    categoryId: "computadoras",
  },
  {
    icon: UtensilsCrossed,
    title: "Mobiliario para restaurantes",
    description:
      "Mesas, sillas y bases metálicas duraderas para tu negocio de alimentos.",
    image: "Foto: mobiliario de restaurante",
    categoryId: "sillas-restaurante",
  },
  {
    icon: Armchair,
    title: "Sillas de auditorio e iglesia",
    description:
      "Butacas cómodas y resistentes, pensadas para espacios de gran aforo.",
    image: "Foto: sillas de auditorio",
    categoryId: "sillas-iglesia",
  },
];

export function Categories() {
  return (
    <section id="productos" className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Soluciones para cada necesidad
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Cuatro líneas de producto, un mismo estándar de calidad y garantía.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map(
          ({ icon: Icon, title, description, image, categoryId }) => (
            <Link
              key={title}
              href={`/productos?categoria=${categoryId}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 transition-shadow hover:shadow-lg hover:shadow-slate-200/60"
            >
              <ImagePlaceholder
                label={image}
                icon={Icon}
                className="aspect-[4/3] w-full"
              />
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="flex-1 text-sm leading-6 text-slate-600">
                  {description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                  Ver más
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
