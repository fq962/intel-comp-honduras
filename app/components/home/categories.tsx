import {
  Armchair,
  ChevronRight,
  Cpu,
  ShieldCheck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES: {
  icon: LucideIcon;
  title: string;
  description: string;
  image: { src: string; alt: string };
  categoryId: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Sistemas de seguridad",
    description:
      "Cámaras, control de acceso y monitoreo para proteger tu negocio o vivienda.",
    image: {
      src: "/assets/products/camara-ip-domo-4mp.jpg",
      alt: "Cámara de seguridad tipo domo instalada en el techo",
    },
    categoryId: "seguridad",
  },
  {
    icon: Cpu,
    title: "Computadoras de alto rendimiento",
    description:
      "Equipos de cómputo para oficina, diseño y gaming, con garantía oficial.",
    image: {
      src: "/assets/products/computadora-escritorio-i5.jpg",
      alt: "Computadora de escritorio con monitor, teclado y mouse en oficina",
    },
    categoryId: "computadoras",
  },
  {
    icon: UtensilsCrossed,
    title: "Mobiliario para restaurantes",
    description:
      "Mesas, sillas y bases metálicas duraderas para tu negocio de alimentos.",
    image: {
      src: "/assets/products/mesa-redonda-base-metalica.jpg",
      alt: "Mesa redonda con base metálica y sillas para restaurante",
    },
    categoryId: "sillas-restaurante",
  },
  {
    icon: Armchair,
    title: "Sillas de auditorio e iglesia",
    description:
      "Butacas cómodas y resistentes, pensadas para espacios de gran aforo.",
    image: {
      src: "/assets/products/butaca-reclinable-iglesia.jpg",
      alt: "Butacas reclinables rojas en un auditorio",
    },
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
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <span className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="flex-1 text-sm leading-6 text-slate-600">
                  {description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-800">
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
