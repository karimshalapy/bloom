import { Button, ButtonVariant, CartContent, Sheet } from "@/components";
import { useCart } from "@/context";
import { ShoppingCart } from "@phosphor-icons/react";
import { FC } from "react";
import classes from "./CartButton.module.css";

export const CartButton: FC = () => {
  const { total } = useCart();

  return (
    <Sheet
      title="Cart"
      trigger={
        <Button
          className={classes.cartButton}
          variant={ButtonVariant.ghost}
          square
        >
          <ShoppingCart role="img" aria-label="Shopping Cart" />
          {total.count > 0 && (
            <span className={classes.countTooltip}>{total.count}</span>
          )}
        </Button>
      }
    >
      <CartContent />
    </Sheet>
  );
};

export default CartButton;
