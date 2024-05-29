import { createContext } from "react";
import type { ToastProviderValue } from "./toastTypes";

export const toastContext = createContext<ToastProviderValue>({
  toasts: [],
  toast: () => {},
  destroy: () => {},
});
