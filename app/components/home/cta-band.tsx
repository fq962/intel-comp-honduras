import { ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section id="contacto" className="bg-blue-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          ¿Listo para equipar tu empresa?
        </h2>
        <p className="max-w-xl text-blue-100">
          Escríbenos y un asesor te ayudará a encontrar la solución adecuada,
          con la mejor relación de calidad y precio.
        </p>
        <a
          href="mailto:contacto@intelcomphonduras.com"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
        >
          Contáctanos ahora
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
