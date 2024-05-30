import { Product } from "@/types";

/** The context value provided by the ProductsProvider. */
export interface ProductsProviderValue {
  /** Indicates whether the products are currently being loaded.*/
  loading: boolean;
  /** The list of loaded products.*/
  products: Product[];
  /** Function to load more products.*/
  loadMore: () => void;
  /** Indicates whether the current page is the last page of products.*/
  isLastPage: boolean;
  /** The total number of products available.*/
  total: number;
  /** The total number of products per page */
  pageSize: number;
}
