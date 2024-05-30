import { ProductStock, type Product } from "@/types";
import type { FC } from "react";
import classes from "./AddToCartButton.module.css";
import { Button, ButtonProps, CartLineItemQuantityUpdater } from "@/components";
import { ShoppingCart } from "@phosphor-icons/react";
import { useCart } from "@/context";

/** Labels for different product stock statuses.*/
const stockLabel: Record<ProductStock, string> = {
  [ProductStock.inStock]: "Add To Cart",
  [ProductStock.outOfStock]: "Out Of Stock",
  [ProductStock.lowStock]: "Low Stock Add Now",
};

/** Props for the AddToCartButton component. */
interface AddToCartButtonProps extends Omit<ButtonProps, "children"> {
  /** The product to be added to the cart. */
  product: Product;
}

/**
 * Component for adding a product to the cart or updating its quantity if already in the cart.
 * @component
 */
export const AddToCartButton: FC<AddToCartButtonProps> = ({
  product,
  onClick,
  ...props
}) => {
  const { cartLineItems, addCartLineItem } = useCart();

  return cartLineItems[product.id] ? (
    <CartLineItemQuantityUpdater product={product} />
  ) : (
    <Button
      className={classes.addToCartBtn}
      slotPrefix={<ShoppingCart role="presentation" />}
      reverse
      disabled={
        !product.availabilityStatus ||
        product.availabilityStatus === ProductStock.outOfStock ||
        product.stock < product.minimumOrderQuantity
      }
      onClick={(e) => {
        addCartLineItem(product);
        onClick?.(e);
      }}
      {...props}
    >
      {
        stockLabel[
          product.stock < product.minimumOrderQuantity
            ? ProductStock.outOfStock
            : product.availabilityStatus || ProductStock.outOfStock
        ]
      }
    </Button>
  );
};

export default AddToCartButton;
