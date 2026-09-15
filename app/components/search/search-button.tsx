"use client";

import { Search } from "lucide-react";
import { useSearch } from "@/app/components/search/search-context";

export function SearchButton() {
  const { openSearch } = useSearch();

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Buscar productos"
      className="flex h-10 items-center gap-2 rounded-full px-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#8a6f00] sm:px-3"
    >
      <Search className="h-5 w-5" />
      <span className="hidden items-center gap-1 text-xs text-slate-400 md:inline-flex">
        <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans text-[11px]">
          {"⌘"}
        </kbd>
        <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans text-[11px]">
          K
        </kbd>
      </span>
    </button>
  );
}
