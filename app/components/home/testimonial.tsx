import { Quote, User } from "lucide-react";
import { ImagePlaceholder } from "@/app/components/image-placeholder";

export function Testimonial() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <Quote className="mx-auto h-10 w-10 text-blue-200" />
        <p className="mt-6 text-2xl font-medium leading-9 text-slate-900 sm:text-3xl">
          “Es una empresa de mucho prestigio para los clientes, las marcas
          son reconocidas y la garantía por calidad es segura.”
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <ImagePlaceholder icon={User} className="h-12 w-12 rounded-full" />
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">
              Manuel Chinchilla
            </p>
            <p className="text-sm text-slate-500">Fotógrafo profesional</p>
          </div>
        </div>
      </div>
    </section>
  );
}
