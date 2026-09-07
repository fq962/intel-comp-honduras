import { ImageIcon, type LucideIcon } from "lucide-react";

export function ImagePlaceholder({
  label,
  icon: Icon = ImageIcon,
  className = "",
}: {
  label?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 ${className}`}
    >
      <Icon className="h-10 w-10 text-slate-300" strokeWidth={1.5} />
      {label && (
        <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-slate-500 backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
