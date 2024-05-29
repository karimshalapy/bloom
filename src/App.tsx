import { Button, ToastGroup, ProductsListing } from "@/components";
import { DefaultLayout } from "@/layouts";
import { useProducts } from "@/context";
import classes from "./App.module.css";

function App() {
  const { products, loadMore, loading, isLastPage, total } = useProducts();
  return (
    <DefaultLayout>
      <section className={classes.contentWrapper}>
        <div className={classes.titleWrapper}>
          <h1>Products</h1>
          {total > 0 && (
            <p>
              Total Products:{" "}
              <span className={classes.productsCount}>{total}</span>
            </p>
          )}
        </div>
        {products.length > 0 || (products.length === 0 && loading) ? (
          <ProductsListing products={products} />
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
        >
          Load More
        </Button>
      )}
      <ToastGroup />
    </DefaultLayout>
  );
}

export default App;
