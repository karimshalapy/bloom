import { FC, PropsWithChildren, useMemo, useState } from "react";
import { cartContext } from "./cartContext";
import { Cart, LineItems } from "./cartContextTypes";
import { safelyParseJSON } from "@/utils";

const LOCAL_STORAGE_KEY = "cart-line-items";

/**
 * Saves the line items to local storage.
 * @param lineItems - The line items to save.
 */
const saveLineItemsToStorage = (lineItems: LineItems) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lineItems));
};

/**
 * Retrieves the line items from local storage.
 * @returns The retrieved line items or an empty object if none found.
 */
const getLineItemsFromStorage = () => {
  return (
    safelyParseJSON<LineItems>(localStorage.getItem(LOCAL_STORAGE_KEY) || "") ||
    {}
  );
};

/**
 * CartProvider component to manage and provide cart data.
 * @component
 */
export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [lineItems, setLineItems] = useState<LineItems>(
    getLineItemsFromStorage
  );

  const total = useMemo(() => {
    return Object.values(lineItems).reduce(
      (prev, current) => ({
        count: prev.count + current.quantity,
        price: prev.price + current.product.price * current.quantity,
      }),
      { count: 0, price: 0 }
    );
  }, [lineItems]);

  /**
   * Adds a product to the cart.
   * @param product - The product to add.
   * @param quantity - The quantity of the product to add.
   */
  const addCartLineItem: Cart["addCartLineItem"] = (product, quantity = 1) => {
    setLineItems((prev) => {
      const quantityAfterAddition = Math.max(
        quantity + (prev[product.id]?.quantity || 0),
        product.minimumOrderQuantity || 1
      );

      if (quantityAfterAddition > product.stock) return prev;

      const cartAfterAddition = {
        ...prev,
        [product.id]: {
          product,
          quantity: quantityAfterAddition,
        },
      };

      saveLineItemsToStorage(cartAfterAddition);

      return cartAfterAddition;
    });
  };

  /**
   * Deletes a product from the cart.
   * @param productId - The ID of the product to delete.
   */
  const deleteCartLineItem: Cart["deleteCartLineItem"] = (productId) => {
    setLineItems((prev) => {
      const lineItem = prev[productId];

      if (!lineItem) return prev;

      const cartClone = { ...prev };
      delete cartClone[productId];

      saveLineItemsToStorage(cartClone);

      return cartClone;
    });
  };

  /**
   * Removes a quantity of a product from the cart.
   * @param productId - The ID of the product to remove.
   * @param quantity - The quantity to remove.
   */
  const removeCartLineItem: Cart["removeCartLineItem"] = (
    productId,
    quantity = 1
  ) => {
    setLineItems((prev) => {
      const lineItem = prev[productId];

      if (!lineItem) return prev;

      const quantityAfterRemoval = (lineItem.quantity || 0) - quantity;

      const cartAfterRemoval = {
        ...prev,
        [productId]: {
          ...lineItem,
          quantity: quantityAfterRemoval,
        },
      };

      if (quantityAfterRemoval < lineItem.product.minimumOrderQuantity) {
        delete cartAfterRemoval[productId];
      }

      saveLineItemsToStorage(cartAfterRemoval);

      return cartAfterRemoval;
    });
  };

  /** Clears all items from the cart. */
  const clearCart: Cart["clearCart"] = () => {
    setLineItems({});
    saveLineItemsToStorage({});
  };

  return (
    <cartContext.Provider
      value={{
        cartLineItems: lineItems,
        total,
        addCartLineItem,
        removeCartLineItem,
        deleteCartLineItem,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
