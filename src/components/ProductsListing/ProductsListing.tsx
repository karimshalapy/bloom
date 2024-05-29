import { FC } from "react";
import type { Product } from "@/types";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductsListing.module.css";

/** Props for the ProductsListing component.*/
interface ProductsListingProps {
  /** The list of products to display.*/
  products: Product[];
}

/**
 * ProductsListing component to display a list of products using ProductCard components.
 * @component
 */
export const ProductsListing: FC<ProductsListingProps> = ({
  products = [],
}) => {
  return (
    <ul className={classes.productsListing}>
      {products.map((product) => (
        <ProductCard
          className={classes.product}
          key={product.id}
          as="li"
          product={product}
        />
      ))}
    </ul>
  );
};

export default ProductsListing;
