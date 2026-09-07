import type { Metadata } from "next";
import { ProductCatalog } from "@/app/components/products/product-catalog";
import { CATEGORIES } from "@/app/lib/products";

export const metadata: Metadata = {
  title: "Productos | Intelcomp Honduras",
  description:
    "Explora nuestro catálogo de tecnología, mobiliario y sistemas de seguridad para tu empresa.",
};

export default async function ProductosPage(props: PageProps<"/productos">) {
  const searchParams = await props.searchParams;
  const categoria =
    typeof searchParams.categoria === "string" ? searchParams.categoria : null;
  const initialCategoryId = CATEGORIES.some((c) => c.id === categoria)
    ? categoria
    : null;

  return <ProductCatalog initialCategoryId={initialCategoryId} />;
}
