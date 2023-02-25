import { products } from "./Data.js";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product } from "https://framer.com/m/zTypes-zMpu.js@6VwHGTSWM8aoqeePOJwR";
interface ProductState {
  products: Product[];
  filtered: Product[];
  isRender: () => boolean;
  FilterByFilters: (products: Product[], filters: object[]) => Product[];
  FilterByName: (products: Product[], name: string) => Product[];
  Filter: (payload: { filter: object[]; name: string }) => Product[];
}

const Products = create<ProductState>()(
  immer((set, get) => ({
    products,
    filtered: [],
    FilterByFilters: (products, filters = []) => {
      let result = products;
      Object.entries(filters).forEach(([name, value]: any) => {
        result = result.map((item) => {
          let save = true;

          value.forEach((val) => {
            if (save) {
              if (Array.isArray(item[name])) {
                save = item[name].includes(val);
              } else {
                save = item[name] === val;
              }
            }
          });
          if (item.alive && !save) item.alive = false;

          return item;
        });
      });
      return result;
    },
    FilterByName(products, name) {
      return products.map((product) => {
        let save = name
          ? product.model.toLowerCase().includes(name.toLocaleLowerCase())
          : true;
        if (product.alive && !save) product.alive = save;
        return product;
      });
    },
    Filter({ filter, name }) {
      let products = get().products.map((p) => ({ ...p, alive: true }));
      products = get().FilterByFilters(products, filter);
      products = get().FilterByName(products, name);
      set((state) => {
        state.filtered = products;
      });
      return get().filtered;
    },
    isRender() {
      return get().filtered.find(({ alive }) => alive);
    }
  }))
);

export default {
  Filter: () => Products((state) => state.Filter),
  isRender: () => Products((state) => state.isRender)
};
