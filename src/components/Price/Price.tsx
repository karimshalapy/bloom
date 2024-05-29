import type { FC } from "react";
import clsx from "clsx";
import type {
  DetailedHTMLProps,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import classes from "./Price.module.css";

/** Props for the Price component. */
export interface PriceProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    "itemScope" | "itemType"
  > {
  /** The HTML element or custom component to render. */
  as?: ElementType;
  /** The price value to display. */
  value: number | undefined;
  /** Content to display after the price. */
  slotSuffix?: ReactNode;
  /** Content to display before the price.*/
  slotPrefix?: ReactNode;
}

/**
 * Price component to display a formatted GBP price with optional prefix and suffix content.
 * @component
 */
export const Price: FC<PriceProps> = ({
  as: Comp = "span",
  value = 0,
  slotPrefix,
  slotSuffix,
  className,
  ...rest
}) => {
  return (
    <Comp
      itemScope
      itemType="https://schema.org/Offer"
      className={clsx(classes.price, className)}
      data-testid="price"
      {...rest}
    >
      {slotPrefix}
      <span itemProp="price">
        {value
          ? new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }).format(value)
          : "Free"}
      </span>
      {slotSuffix}
    </Comp>
  );
};

export default Price;
