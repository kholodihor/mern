import { create } from "zustand";
import { CATEGORIES } from "@/constants/categories";

interface FiltersState {
  filters: string[];
  setFilters: (query: string[]) => void;
}

export const useFilters = create<FiltersState>((set) => ({
  filters: [CATEGORIES.ALL],

  setFilters: (query: string[]) => {
    set({ filters: query });
  },
}));
