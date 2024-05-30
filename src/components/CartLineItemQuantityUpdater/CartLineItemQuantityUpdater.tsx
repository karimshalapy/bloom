import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import type { Product } from "@/types";
import { Minus, Plus } from "@phosphor-icons/react";
import { Button } from "@/components";
import { useCart } from "@/context";
import classes from "./CartLineItemQuantityUpdater.module.css";
import clsx from "clsx";

/** Props for the CartLineItemQuantityUpdater component.*/
interface CartLineItemQuantityUpdaterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** The product whose quantity is being updated.*/
  product: Product;
  /** Whether to use a compact style for the updater.*/
  compact?: boolean;
}

/**
 * Component for updating the quantity of a product in the cart.
 * @component
 */
export const CartLineItemQuantityUpdater: FC<
  CartLineItemQuantityUpdaterProps
> = ({ product, compact = false, className, ...props }) => {
  const { cartLineItems, removeCartLineItem, addCartLineItem } = useCart();

  return (
    <div
      className={clsx(
        classes.cartLineItemQuantityUpdater,
        compact && classes.compact,
        className
      )}
      {...props}
    >
      <Button reverse square onClick={() => removeCartLineItem(product.id)}>
        <Minus role="img" aria-label="Decrease Amount" />
      </Button>
      <span>{cartLineItems[product.id].quantity}</span>
      <Button
        reverse
        square
        onClick={() => addCartLineItem(product)}
        disabled={(product.stock || 0) < cartLineItems[product.id].quantity + 1}
      >
        <Plus role="img" aria-label="Add More" />
      </Button>
    </div>
  );
};

export default CartLineItemQuantityUpdater;
