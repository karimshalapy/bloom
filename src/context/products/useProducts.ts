import { useContext } from "react";
import { productsContext } from "./productsContext";

/**
 * Custom hook to access the products context.
 * @returns The value of the products context, including the list of products, the loading boolean, error message, and function to load more.
 */
export const useProducts = () => useContext(productsContext);
