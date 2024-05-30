import { CartLineItemQuantityUpdater, Price } from "@/components";
import type { LineItem } from "@/context";
import clsx from "clsx";
import { DetailedHTMLProps, ElementType, FC, HTMLAttributes } from "react";
import classes from "./CartLineItem.module.css";

/** Props for the CartLineItem component.*/
interface CartLineItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  /** The HTML element or custom component to render. */
  as?: Exclude<ElementType, `h${number}` | "input" | "textarea">;
  /** The heading level for the product title. */
  headingLevel?: Extract<ElementType, `h${number}`>;
  /** The product data to display. */
  lineItem: LineItem;
}

/**
 * Component for displaying a cart line item.
 * @component
 */
export const CartLineItem: FC<CartLineItemProps> = ({
  lineItem,
  as: Comp = "div",
  headingLevel: Heading = "h3",
  className,
  ...props
}) => {
  return (
    <Comp className={clsx(classes.cartLineItem, className)} {...props}>
      <div>
        <Heading>{lineItem.product.title}</Heading>
        <p className={classes.description} title={lineItem.product.description}>
          {lineItem.product.description}
        </p>
        {lineItem.product.minimumOrderQuantity > 1 && (
          <p className={classes.disclaimer}>
            Minimum orderable amount: {lineItem.product.minimumOrderQuantity}
          </p>
        )}
        <div className={classes.controlsWrapper}>
          <CartLineItemQuantityUpdater product={lineItem.product} compact />
          <Price
            className={classes.price}
            value={lineItem.product.price * lineItem.quantity}
          />
        </div>
      </div>
      <img
        className={classes.productImage}
        src={lineItem.product.thumbnail}
        alt={lineItem.product.title}
      />
    </Comp>
  );
};

export default CartLineItem;
