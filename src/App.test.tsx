import { render } from "@/tests/utils";
import { describe } from "node:test";
import { expect, test } from "vitest";
import App from "./App";
import { fireEvent } from "@testing-library/react";

describe("Main App", () => {
  test("Loading skeletons are rendered correctly while loading", async () => {
    const rendered = render(<App />);
    const skeletons = await rendered.findAllByTestId("loading-skeleton");
    expect(skeletons).toHaveLength(19); // 19 skeletons for 18 products in mock and the total count inline skeleton
  });

  test("Product cards are rendered correctly", async () => {
    const rendered = render(<App />);
    const productCards = await rendered.findAllByTestId("product-card");
    expect(productCards).toHaveLength(18); // 18 card for 18 products in mock
  });

  test("Loading skeletons should be rendered when load more is clicked", async () => {
    const rendered = render(<App />);
    // wait for loading to be done
    await rendered.findAllByTestId("product-card");
    //trigger a new loading state
    fireEvent.click(rendered.getByTestId("load-more"));
    //get all loading skeletons
    const skeletons = await rendered.findAllByTestId("loading-skeleton");
    expect(skeletons).toHaveLength(19); // 19 skeletons for 18 products in mock and the total count inline skeleton
  });

  test("More products should be fetched when load more is clicked and loading is done", async () => {
    const rendered = render(<App />);
    // wait for loading to be done
    await rendered.findAllByTestId("product-card");
    //trigger a new loading state
    fireEvent.click(rendered.getByTestId("load-more"));
    await rendered.findAllByTestId("loading-skeleton");
    //get all loading skeletons
    const productCards = await rendered.findAllByTestId("product-card");
    expect(productCards).toHaveLength(18 + 18); // 18 card for 18 products in first page, and 18 for 18 products in second page
  });
});
