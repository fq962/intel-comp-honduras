"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useSearch } from "@/app/components/search/search-context";
import { ProductImage } from "@/app/components/product-image";
import { formatPrice, normalize, PRODUCTS, type Product } from "@/app/lib/products";

const MAX_RESULTS = 8;

export function SearchModal() {
  const { isOpen } = useSearch();
  if (!isOpen) return null;
  return <SearchModalDialog />;
}

function SearchModalDialog() {
  const { closeSearch } = useSearch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo<Product[]>(() => {
    const q = normalize(query);
    if (!q) return [];
    return PRODUCTS.filter(
      (p) => normalize(p.name).includes(q) || normalize(p.category).includes(q),
    ).slice(0, MAX_RESULTS);
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const updateQuery = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  const goToCatalog = (product?: Product) => {
    const params = new URLSearchParams();
    if (product) {
      params.set("buscar", product.name);
      params.set("categoria", product.categoryId);
    } else if (query.trim()) {
      params.set("buscar", query.trim());
    }
    router.push(`/productos?${params.toString()}`);
    closeSearch();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results.length > 0) {
          goToCatalog(results[activeIndex] ?? results[0]);
        } else {
          goToCatalog();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, activeIndex, query]);

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-24 sm:pt-32">
      <div
        onClick={closeSearch}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Buscar productos"
        className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <Search className="h-5 w-5 flex-shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Cerrar búsqueda"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <p className="px-5 py-8 text-center text-sm text-slate-400">
              Escribe el nombre de un producto o categoría.
            </p>
          ) : results.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-400">
              No encontramos productos para &quot;{query}&quot;.
            </p>
          ) : (
            <ul className="py-2">
              {results.map((product, index) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => goToCatalog(product)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                      index === activeIndex ? "bg-slate-50" : ""
                    }`}
                  >
                    <ProductImage
                      product={product}
                      className="h-12 w-12 flex-shrink-0 rounded-lg"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-900">
                        {product.name}
                      </span>
                      <span className="block text-xs text-slate-500">
                        {product.category}
                      </span>
                    </span>
                    <span className="flex-shrink-0 text-sm font-semibold text-slate-900">
                      {formatPrice(product.price)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {query.trim() !== "" && (
          <button
            type="button"
            onClick={() => goToCatalog()}
            className="border-t border-slate-100 px-5 py-3 text-left text-sm font-medium text-blue-800 transition-colors hover:bg-slate-50"
          >
            Ver todos los resultados para &quot;{query}&quot;
          </button>
        )}
      </div>
    </div>
  );
}
