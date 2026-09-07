import {
  Armchair,
  Camera,
  Cable,
  Cpu,
  Headphones,
  Monitor,
  RockingChair,
  Router,
  Table2,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type Product = {
  id: string;
  categoryId: string;
  category: string;
  icon: LucideIcon;
  name: string;
  price: number;
};

export const CATEGORIES: Category[] = [
  { id: "computadoras", label: "Computadoras", icon: Cpu },
  { id: "sillas-oficina", label: "Sillas de oficina", icon: Armchair },
  {
    id: "sillas-restaurante",
    label: "Sillas de restaurante",
    icon: UtensilsCrossed,
  },
  {
    id: "sillas-iglesia",
    label: "Sillas de iglesia y auditorio",
    icon: RockingChair,
  },
  { id: "mesas", label: "Mesas y bases metálicas", icon: Table2 },
  { id: "seguridad", label: "Cámaras de seguridad", icon: Camera },
  { id: "redes", label: "Redes y conectividad", icon: Router },
  { id: "audio", label: "Audio y periféricos", icon: Headphones },
  { id: "accesorios", label: "Accesorios y cables", icon: Cable },
  { id: "monitores", label: "Monitores y proyectores", icon: Monitor },
];

function categoryOf(categoryId: string): Pick<Category, "label" | "icon"> {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) {
    throw new Error(`Unknown category id: ${categoryId}`);
  }
  return category;
}

function product(
  id: string,
  categoryId: string,
  name: string,
  price: number,
): Product {
  const { label, icon } = categoryOf(categoryId);
  return { id, categoryId, category: label, icon, name, price };
}

export const PRODUCTS: Product[] = [
  product(
    "computadora-escritorio-i5",
    "computadoras",
    "Computadora de escritorio Core i5, 8GB RAM",
    12500,
  ),
  product(
    "all-in-one-21",
    "computadoras",
    'All in One 21.5" para oficina',
    15900,
  ),
  product(
    "laptop-empresarial-14",
    "computadoras",
    'Laptop empresarial 14", 16GB RAM',
    18300,
  ),

  product(
    "silla-ergonomica-lumbar",
    "sillas-oficina",
    "Silla ergonómica con soporte lumbar",
    2450,
  ),
  product(
    "silla-gerencial-cuero",
    "sillas-oficina",
    "Silla gerencial reclinable en cuero sintético",
    3200,
  ),
  product(
    "silla-operativa-brazos",
    "sillas-oficina",
    "Silla operativa con brazos ajustables",
    1780,
  ),

  product(
    "silla-apilable-restaurante",
    "sillas-restaurante",
    "Silla apilable para restaurante",
    620,
  ),
  product(
    "silla-bar-respaldo",
    "sillas-restaurante",
    "Silla tipo bar con respaldo",
    890,
  ),
  product(
    "juego-silla-mesa-cafeteria",
    "sillas-restaurante",
    "Juego de silla y mesa para cafetería",
    1450,
  ),

  product(
    "butaca-iglesia-clasica",
    "sillas-iglesia",
    "Butaca para iglesia, modelo Clásica",
    1850,
  ),
  product(
    "silla-auditorio-tapizada",
    "sillas-iglesia",
    "Silla de auditorio tapizada",
    1150,
  ),
  product(
    "butaca-reclinable-iglesia",
    "sillas-iglesia",
    "Butaca reclinable para iglesia",
    2050,
  ),

  product(
    "mesa-redonda-base-metalica",
    "mesas",
    "Mesa redonda con base metálica",
    2300,
  ),
  product(
    "base-metalica-mesa-alta",
    "mesas",
    "Base metálica para mesa alta",
    780,
  ),
  product("mesa-rectangular-plegable", "mesas", "Mesa rectangular plegable", 1690),

  product(
    "camara-ip-domo-4mp",
    "seguridad",
    "Cámara IP domo 4MP con visión nocturna",
    1950,
  ),
  product("kit-4-camaras-dvr", "seguridad", "Kit de 4 cámaras con DVR", 8200),
  product(
    "camara-wifi-exteriores",
    "seguridad",
    "Cámara Wi-Fi para exteriores",
    1350,
  ),

  product("router-wifi-6", "redes", "Router Wi-Fi 6 doble banda", 1850),
  product("switch-8-puertos", "redes", "Switch de 8 puertos Gigabit", 980),
  product(
    "adaptador-usb-wifi",
    "redes",
    "Adaptador USB Wi-Fi de largo alcance",
    450,
  ),

  product(
    "audifonos-bluetooth-anc",
    "audio",
    "Audífonos Bluetooth con cancelación de ruido",
    1250,
  ),
  product(
    "parlante-bluetooth-portatil",
    "audio",
    "Parlante Bluetooth portátil",
    890,
  ),
  product(
    "microfono-condensador-streaming",
    "audio",
    "Micrófono de condensador para streaming",
    1650,
  ),

  product(
    "mochila-laptop-resistente",
    "accesorios",
    "Mochila para laptop resistente al agua",
    750,
  ),
  product(
    "cargador-universal-90w",
    "accesorios",
    "Cargador universal para laptop 90W",
    620,
  ),
  product("cable-hdmi-3m", "accesorios", "Cable HDMI 2.0 de 3 metros", 280),

  product("monitor-led-24-fhd", "monitores", 'Monitor LED 24" Full HD', 4200),
  product(
    "proyector-portatil-fhd",
    "monitores",
    "Proyector portátil Full HD",
    7500,
  ),
  product(
    "monitor-curvo-27-144hz",
    "monitores",
    'Monitor curvo 27" 144Hz',
    8900,
  ),
];

export function formatPrice(price: number): string {
  return `L ${price.toLocaleString("es-HN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
