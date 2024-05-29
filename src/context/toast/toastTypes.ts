import type { PropsWithChildren } from "react";
import type { ToastProps } from "@/components";

/**
 * The duration after which a toast notification should automatically close.
 * Can be a number (milliseconds) or "never" to indicate it should not auto-close.
 */
export type ToastTimeoutDuration = number | "never";

/** Configuration for a toast notification. */
export type ToastConfig = Omit<ToastProps, "type" | "id"> & {
  /** Time in milliseconds after which the toast should close, or "never". */
  closeAfter?: ToastTimeoutDuration;
};

/** Props for the ToastProvider component. */
export interface ToastProviderProps extends PropsWithChildren {
  /** Time in milliseconds after which the toast should close, or "never". */
  closeAfter?: ToastTimeoutDuration;
}

/** The context value provided by the ToastProvider. */
export interface ToastProviderValue {
  /** The list of current toast notifications. */
  toasts: ToastProps[];

  /**
   * Function to create a new toast notification.
   * @param {ToastConfig} config - The configuration for the toast notification.
   */
  toast: (config: ToastConfig) => void;

  /**
   * Function to destroy a toast notification by id.
   * @param {string} id - The id of the toast to destroy.
   */
  destroy: (id: string) => void;
}
