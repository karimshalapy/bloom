import React from "react";
import ReactDOM from "react-dom/client";
import { ProductsProvider, ToastProvider } from "@/context";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </ToastProvider>
  </React.StrictMode>
);
