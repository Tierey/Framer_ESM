import { filters } from "./Data.js";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface FilterState {
  filters: object;
  filter: object;
  setFilter: (payload: { value: any; name: string }) => void;
}

const Filters = create<FilterState>()(
  immer((set, get) => ({
    filters,
    filter: Object.fromEntries(Object.keys(filters).map((n) => [n, []])),
    setFilter({ name, value }) {
      set((state) => {
        state.filter[name] = value;
      });
    }
  }))
);

export default {
  filters: () => Filters((state) => state.filters),
  filter: () => Filters((state) => state.filter),
  setFilter: () => Filters((state) => state.setFilter)
};
