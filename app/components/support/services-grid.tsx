import { Droplets, Printer, Video, Wrench } from "lucide-react";
import { ServiceCard, type Service } from "@/app/components/support/service-card";

const SERVICES: Service[] = [
  {
    icon: Droplets,
    title: "Refil de cartuchos",
    description:
      "Servicio especializado de relleno de cartuchos y tóner con tecnología avanzada, para que tu impresora rinda como nueva sin pagar el precio de un cartucho original.",
    groups: [
      {
        items: [
          "Relleno de cartuchos y tóner",
          "Cambio de chip",
          "Pruebas de calidad de impresión",
        ],
      },
    ],
    brands: [
      "Canon",
      "HP",
      "Brother",
      "Lexmark",
      "Samsung",
      "Xerox",
      "Toshiba",
      "Sharp",
      "Kyocera",
    ],
  },
  {
    icon: Printer,
    title: "Reparación de impresoras",
    description:
      "Diagnóstico y reparación de impresoras láser, inkjet y plotters de todas las marcas, con repuestos de calidad y garantía en el servicio.",
    groups: [
      {
        items: [
          "Cambio de cabezales",
          "Actualización de firmware",
          "Revisión general",
          "Mantenimiento preventivo",
        ],
      },
    ],
  },
  {
    icon: Wrench,
    title: "Mantenimiento de computadoras",
    description:
      "Taller especializado en equipos de escritorio y portátiles, con diagnóstico rápido y stock amplio de piezas de repuesto.",
    groups: [
      {
        label: "Computadoras de escritorio",
        items: [
          "Diagnóstico rápido",
          "Soporte para equipos Apple",
          "Recuperación de datos",
          "Instalación de sistemas operativos",
        ],
      },
      {
        label: "Laptops",
        items: [
          "Cambio de pantalla y teclado",
          "Reparación de motherboard",
          "Recuperación de información",
        ],
      },
    ],
  },
  {
    icon: Video,
    title: "Instalación de sistemas de vigilancia",
    description:
      "Instalación y configuración profesional de cámaras de seguridad para tu hogar o negocio, con monitoreo remoto desde tu celular.",
    groups: [
      {
        items: [
          "Instalación de cámaras IP y analógicas",
          "Configuración de DVR / NVR",
          "Monitoreo remoto desde tu celular",
          "Mantenimiento del sistema",
        ],
      },
    ],
  },
];

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid items-start gap-6 lg:grid-cols-2">
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}
