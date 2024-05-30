import { useContext } from "react";
import { cartContext } from "./cartContext";

/**
 * Custom hook to access the cart context.
 * @returns The value of the cart context, including the list of line items, total price and cart functionalities.
 */
export const useCart = () => useContext(cartContext);
