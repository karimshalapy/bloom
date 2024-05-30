import {
  Button,
  LoadingSkeleton,
  ProductsListing,
  ToastGroup,
} from "@/components";
import { useProducts } from "@/context";
import { DefaultLayout } from "@/layouts";
import { ArrowDown } from "@phosphor-icons/react";
import classes from "./App.module.css";

function App() {
  const { products, loadMore, loading, isLastPage, total, pageSize } =
    useProducts();
  return (
    <DefaultLayout>
      <section className={classes.contentWrapper}>
        <div className={classes.titleWrapper}>
          <h1>Products</h1>
          {(total > 0 || (!total && loading)) && (
            <p aria-busy={loading}>
              Total Products:{" "}
              {loading ? (
                <LoadingSkeleton as="span" width={27} inline />
              ) : (
                <span className={classes.productsCount}>{total}</span>
              )}
            </p>
          )}
        </div>
        {products.length > 0 || (products.length === 0 && loading) ? (
          <ProductsListing
            products={products}
            loading={loading}
            pageSize={pageSize}
          />
        ) : (
          <p>No products found.</p>
        )}
      </section>
      {products.length > 0 && !isLastPage && (
        <Button
          className={classes.loadMoreButton}
          onClick={loadMore}
          disabled={loading}
          loading={loading}
          slotPrefix={<ArrowDown />}
        >
          Load More
        </Button>
      )}
      <ToastGroup />
    </DefaultLayout>
  );
}

export default App;
