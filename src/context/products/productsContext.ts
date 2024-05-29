import { createContext } from "react";
import { ProductsProviderValue } from "./productsContextTypes";

export const productsContext = createContext<ProductsProviderValue>({
  loading: false,
  products: [],
  loadMore: () => {},
  isLastPage: false,
  total: 0,
});
