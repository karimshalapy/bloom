import { Product } from "@/types";

/**Interface representing a line item in the cart. */
export interface LineItem {
  /** The product added to the cart. */
  product: Product;
  /** The quantity of the product in the cart. */
  quantity: number;
}

/**Type representing the collection of line items in the cart, indexed by product ID. */
export type LineItems = Record<Product["id"], LineItem>;

/**Interface representing the cart context value. */
export interface Cart {
  /** The collection of line items in the cart. */
  cartLineItems: LineItems;
  /** The total count and price of items in the cart. */
  total: {
    /** The total number of items in the cart. */
    count: number;
    /** The total price of items in the cart. */
    price: number;
  };

  /**
   * Function to add a product to the cart.
   * @param product - The product to add.
   * @param quantity - The quantity of the product to add.
   */
  addCartLineItem: (product: Product, quantity?: number) => void;

  /**
   * Function to remove a quantity of a product from the cart.
   * @param productId - The ID of the product to remove.
   * @param quantity - The quantity to remove.
   */
  removeCartLineItem: (productId: Product["id"], quantity?: number) => void;

  /**
   * Function to delete a product from the cart.
   * @param productId - The ID of the product to delete.
   */
  deleteCartLineItem: (productId: Product["id"]) => void;

  /** Function to clear all items from the cart. */
  clearCart: () => void;
}
