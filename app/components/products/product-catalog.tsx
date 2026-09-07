"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Grid2x2,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { ProductCard } from "@/app/components/product-card";
import { CATEGORIES, PRODUCTS } from "@/app/lib/products";

const PAGE_SIZE = 9;

const SORT_OPTIONS = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "nombre-az", label: "Nombre: A-Z" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export function ProductCatalog({
  initialCategoryId,
}: {
  initialCategoryId: string | null;
}) {
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [sortBy, setSortBy] = useState<SortValue>("relevancia");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const base = categoryId
      ? PRODUCTS.filter((p) => p.categoryId === categoryId)
      : PRODUCTS;

    const sorted = [...base];
    if (sortBy === "precio-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "precio-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "nombre-az") {
      sorted.sort((a, b) => a.name.localeCompare(b.name, "es"));
    }
    return sorted;
  }, [categoryId, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filteredProducts.slice(pageStart, pageStart + PAGE_SIZE);

  const selectCategory = (id: string | null) => {
    setCategoryId(id);
    setPage(1);
    setFiltersOpen(false);
  };

  const selectSort = (value: SortValue) => {
    setSortBy(value);
    setPage(1);
  };

  const activeCategory = CATEGORIES.find((c) => c.id === categoryId);

  return (
    <div className="bg-white">
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-800">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-900">Productos</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {activeCategory ? activeCategory.label : "Productos"}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Tecnología, mobiliario y sistemas de seguridad para tu empresa, con
          la garantía Intelcomp Honduras.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside>
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="mb-4 inline-flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 lg:hidden"
            >
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filtrar por categoría
              </span>
              {filtersOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            <nav
              className={`${filtersOpen ? "block" : "hidden"} space-y-1 lg:block`}
            >
              <button
                type="button"
                onClick={() => selectCategory(null)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  categoryId === null
                    ? "bg-blue-50 text-blue-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Todos los productos
                <span className="text-xs text-slate-400">
                  {PRODUCTS.length}
                </span>
              </button>

              {CATEGORIES.map((category) => {
                const count = PRODUCTS.filter(
                  (p) => p.categoryId === category.id,
                ).length;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => selectCategory(category.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      categoryId === category.id
                        ? "bg-blue-50 text-blue-900"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {category.label}
                    <span className="text-xs text-slate-400">{count}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <p className="text-sm text-slate-500">
                Mostrando {pageItems.length === 0 ? 0 : pageStart + 1}–
                {pageStart + pageItems.length} de {filteredProducts.length}{" "}
                resultados
              </p>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => selectSort(e.target.value as SortValue)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-blue-600 focus:outline-none"
                  aria-label="Ordenar por"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center rounded-lg border border-slate-200 p-1">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    aria-label="Ver como cuadrícula"
                    aria-pressed={view === "grid"}
                    className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                      view === "grid"
                        ? "bg-blue-800 text-white"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Grid2x2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    aria-label="Ver como lista"
                    aria-pressed={view === "list"}
                    className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                      view === "list"
                        ? "bg-blue-800 text-white"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={
                view === "grid"
                  ? "mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  : "mt-8 flex flex-col gap-4"
              }
            >
              {pageItems.map((product) => (
                <ProductCard key={product.id} productId={product.id} view={view} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      aria-current={p === currentPage}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        p === currentPage
                          ? "bg-blue-800 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
