import { Button, Price } from "@/components";
import { ShoppingCart } from "@phosphor-icons/react";
import clsx from "clsx";
import type { DetailedHTMLProps, ElementType, FC, HTMLAttributes } from "react";
import { Product, ProductStock } from "@/types";
import classes from "./ProductCard.module.css";

/** Props for the ProductCard component.*/
interface ProductCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  /** The HTML element or custom component to render.*/
  as?: Exclude<ElementType, `h${number}` | "input" | "textarea">;
  /** The heading level for the product title.*/
  headingLevel?: Extract<ElementType, `h${number}`>;
  /** The product data to display.*/
  product: Product;
}

/** Labels for different product stock statuses.*/
const stockLabel: Record<ProductStock, string> = {
  [ProductStock.inStock]: "Add To Cart",
  [ProductStock.outOfStock]: "Out Of Stock",
  [ProductStock.lowStock]: "Low Stock Add Now",
};

/**
 * ProductCard component to display product information in a card format.
 * @component
 */
export const ProductCard: FC<ProductCardProps> = ({
  as: Comp = "div",
  headingLevel: Heading = "h2",
  className,
  product,
  ...props
}) => {
  return (
    <Comp
      className={clsx(classes.productCard, className)}
      itemScope
      itemType="https://schema.org/Product"
      {...props}
    >
      <img
        itemProp="image"
        className={classes.productCardImage}
        src={product.thumbnail}
        alt={product.title}
      />
      {Boolean(product.discountPercentage) && (
        <div className={classes.discount}>-{product.discountPercentage}%</div>
      )}
      <div className={classes.productCardContent}>
        <Heading className={classes.cardHeading} itemProp="name">
          {product.title}
        </Heading>
        <div className={classes.categoryPriceWrapper}>
          <p className={classes.categories}>
            <span itemProp="category">{product.category}</span>{" "}
            {product.brand && (
              <>
                | <span itemProp="manufacturer">{product.brand}</span>
              </>
            )}
          </p>
          <Price
            itemProp="offers"
            className={classes.price}
            value={product.price}
          />
        </div>
        {/* TODO: add cart functionality later */}
        <Button
          className={classes.addToCartBtn}
          slotPrefix={<ShoppingCart className={classes.cartIcon} />}
          reverse
          disabled={
            !product.availabilityStatus ||
            product.availabilityStatus === ProductStock.outOfStock
          }
        >
          {stockLabel[product.availabilityStatus || ProductStock.outOfStock]}
        </Button>
      </div>
    </Comp>
  );
};

export default ProductCard;
