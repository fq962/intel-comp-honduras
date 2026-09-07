import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBERS = ["3396-9706", "9442-3491", "9442-3479"];

const SCHEDULE = [
  { day: "Lunes a viernes", hours: "8:00 am – 5:00 pm" },
  { day: "Sábados", hours: "8:30 am – 3:00 pm" },
  { day: "Domingos", hours: "Cerrado" },
];

const ADDRESS =
  "1ra Calle, 5 y 6 avenida N.E, Col. Smith, Plaza Kronos Local N.2, San Pedro Sula, Honduras";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
        <ul className="space-y-5 text-sm">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-800" />
            <div>
              <p className="font-semibold text-slate-900">Dirección</p>
              <p className="mt-0.5 text-slate-600">{ADDRESS}</p>
            </div>
          </li>

          <li className="flex gap-3">
            <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-800" />
            <div>
              <p className="font-semibold text-slate-900">Teléfono local</p>
              <a
                href="tel:+50425539541"
                className="mt-0.5 block text-slate-600 hover:text-blue-800"
              >
                (504) 2553-9541
              </a>
            </div>
          </li>

          <li className="flex gap-3">
            <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-800" />
            <div>
              <p className="font-semibold text-slate-900">
                Llamadas y WhatsApp
              </p>
              <div className="mt-0.5 flex flex-col gap-0.5">
                {WHATSAPP_NUMBERS.map((number) => (
                  <a
                    key={number}
                    href={`https://wa.me/504${number.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-blue-800"
                  >
                    (504) {number}
                  </a>
                ))}
              </div>
            </div>
          </li>

          <li className="flex gap-3">
            <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-800" />
            <div>
              <p className="font-semibold text-slate-900">
                Correo electrónico
              </p>
              <a
                href="mailto:contacto@intelcomphonduras.com"
                className="mt-0.5 block text-slate-600 hover:text-blue-800"
              >
                contacto@intelcomphonduras.com
              </a>
            </div>
          </li>

          <li className="flex gap-3">
            <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-800" />
            <div>
              <p className="font-semibold text-slate-900">
                Horario de atención
              </p>
              <dl className="mt-1 space-y-0.5">
                {SCHEDULE.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between gap-4">
                    <dt className="text-slate-500">{day}</dt>
                    <dd className="text-slate-700">{hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </li>
        </ul>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <iframe
          title="Ubicación de Intelcomp Honduras en el mapa"
          src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
          className="h-72 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
