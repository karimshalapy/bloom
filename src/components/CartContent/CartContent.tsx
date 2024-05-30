import type { FC } from "react";
import classes from "./CartContent.module.css";
import { useCart } from "@/context";
import { CartLineItem, Price } from "@/components";

/**
 * Component for displaying the contents of the shopping cart.
 * @component
 */
export const CartContent: FC = () => {
  const { cartLineItems, total } = useCart();

  return (
    <section>
      {total.count ? (
        <>
          <ul className={classes.lineItemsListing}>
            {Object.values(cartLineItems).map((item) => (
              <CartLineItem lineItem={item} key={item.product.id} />
            ))}
          </ul>
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
