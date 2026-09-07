import { CheckCircle2, type LucideIcon } from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  groups: { label?: string; items: string[] }[];
  brands?: string[];
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 p-6 sm:p-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-800/10 text-blue-800">
        <Icon className="h-6 w-6" />
      </span>

      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {service.description}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {service.groups.map((group, i) => (
          <div key={group.label ?? i}>
            {group.label && (
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                {group.label}
              </p>
            )}
            <ul className={`space-y-2 ${group.label ? "mt-2" : ""}`}>
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-800" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {service.brands && (
        <div className="border-t border-slate-100 pt-5">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Marcas que atendemos
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.brands.map((brand) => (
              <span
                key={brand}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
