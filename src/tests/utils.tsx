import { ToastProvider, ProductsProvider, CartProvider } from "@/context";
import { RenderOptions, render } from "@testing-library/react";
import type { FC, PropsWithChildren, ReactNode } from "react";

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ToastProvider>
      <ProductsProvider>
        <CartProvider>{children}</CartProvider>
      </ProductsProvider>
    </ToastProvider>
  );
};

const customRender = (ui: ReactNode, options: RenderOptions = {}) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export { customRender as render };
