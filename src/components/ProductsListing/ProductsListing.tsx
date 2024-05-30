import { LoadingSkeleton } from "@/components";
import type { Product } from "@/types";
import { FC } from "react";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductsListing.module.css";

/** Props for the ProductsListing component.*/
interface ProductsListingProps {
  /** The list of products to display.*/
  products: Product[];
  /** A boolean indicating whether the products are loading or not */
  loading?: boolean;
  /** The amount of products to be rendered per page */
  pageSize: number;
}

/**
 * ProductsListing component to display a list of products using ProductCard components.
 * @component
 */
export const ProductsListing: FC<ProductsListingProps> = ({
  products = [],
  loading = false,
  pageSize,
}) => {
  return (
    <ul className={classes.productsListing} aria-busy={loading}>
      {products.map((product) => (
        <ProductCard
          className={classes.product}
          key={product.id}
          as="li"
          product={product}
        />
      ))}
      {loading &&
        Array.from({ length: pageSize }, (_, i) => (
          <LoadingSkeleton key={i} as="li" height={400} />
        ))}
    </ul>
  );
};

export default ProductsListing;
