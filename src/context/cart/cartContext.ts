import { createContext } from "react";
import { Cart } from "./cartContextTypes";

export const cartContext = createContext<Cart>({
  cartLineItems: {},
  total: {
    count: 0,
    price: 0,
  },
  addCartLineItem: () => {},
  removeCartLineItem: () => {},
  deleteCartLineItem: () => {},
  clearCart: () => {},
});
