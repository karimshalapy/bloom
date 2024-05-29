import {
  useEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { productsContext } from "./productsContext";
import type { Product, ProductsResponse } from "@/types";
import { useToast } from "../toast/useToast";

const PAGE_SIZE = 20;

/**
 * ProductsProvider component to manage and provide products data.
 * @component
 */
export const ProductsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const prevCurrentPage = useRef<number>();

  const { toast } = useToast();

  /** Loads more products by incrementing the current page. */
  const loadMore = () => {
    if (loading) return;
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    // calculate the items to be skipped this page.
    const currentPageSkip = PAGE_SIZE * currentPage;

    // update the isLastPage boolean.
    setIsLastPage(currentPageSkip + PAGE_SIZE >= totalProductsCount);

    // don't fetch if we're last page, or the useEffect ran twice on the same page or if it's loading
    if (
      currentPageSkip > totalProductsCount ||
      prevCurrentPage.current === currentPage
    ) {
      return;
    }

    // create the URL search params for the request payload
    const searchParams = new URLSearchParams({
      skip: currentPageSkip.toString(),
      limit: PAGE_SIZE.toString(),
    });

    // fetch the page products data
    setLoading(true);
    fetch(`https://dummyjson.com/products?${searchParams}`)
      .then((res) => {
        if (!res.ok) {
          toast({
            content:
              "Something went wrong! Failed to fetch products from the API.",
          });
          return;
        }
        return res.json() as Promise<ProductsResponse>;
      })
      .then((data) => {
        if (!data) {
          toast({
            content:
              "Something went wrong! Data returned wasn't a proper JSON.",
          });
          return;
        }

        setProducts((prev) => [...prev, ...(data.products || [])]);
        if (data.total) setTotalProductsCount(data.total);
        setLoading(false);
        prevCurrentPage.current = currentPage;
      })
      .catch(() => {
        setLoading(false);
        toast({ content: "Something went wrong! Please try again later." });
      });
  }, [currentPage, totalProductsCount]);

  return (
    <productsContext.Provider
      value={{
        loading,
        products,
        loadMore,
        isLastPage,
        total: totalProductsCount,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsProvider;
