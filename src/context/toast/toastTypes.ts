import type { PropsWithChildren } from "react";
import type { ToastProps } from "@/components";

export type ToastTimeoutDuration = number | "never";
export type ToastConfig = Omit<ToastProps, "type" | "id"> & {
  closeAfter?: ToastTimeoutDuration;
};

export interface ToastProviderProps extends PropsWithChildren {
  closeAfter?: ToastTimeoutDuration;
}

export interface ToastProviderValue {
  toasts: ToastProps[];
  toast: (config: ToastConfig) => void;
  destroy: (id: string) => void;
}
