import Image from "next/image";
import { ImagePlaceholder } from "@/app/components/image-placeholder";
import type { Product } from "@/app/lib/products";

export function ProductImage({
  product,
  className = "",
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  if (product.image) {
    return (
      <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
    );
  }

  return <ImagePlaceholder icon={product.icon} className={className} />;
}
