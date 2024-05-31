import type { FC } from "react";
import classes from "./CartContent.module.css";
import { useCart } from "@/context";
import { Button, ButtonVariant, CartLineItem, Price } from "@/components";

/**
 * Component for displaying the contents of the shopping cart.
 * @component
 */
export const CartContent: FC = () => {
  const { cartLineItems, clearCart, total } = useCart();

  return (
    <section>
      {total.count ? (
        <>
          <ul className={classes.lineItemsListing}>
            {Object.values(cartLineItems).map((item) => (
              <CartLineItem lineItem={item} key={item.product.id} />
            ))}
          </ul>
          <div className={classes.ctaContainer}>
            <Button variant={ButtonVariant.ghost} onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
          <dl className={classes.totalsWrapper}>
            <dt>Total Price</dt>
            <Price as="dd" value={total.price} />
            <dt>Total Count</dt>
            <dd>{total.count}</dd>
          </dl>
        </>
      ) : (
        <p>There are no products added to the cart.</p>
      )}
    </section>
  );
};

export default CartContent;
