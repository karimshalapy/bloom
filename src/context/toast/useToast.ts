import { useContext } from "react";
import { toastContext } from "./toastContext";

/**
 * Custom hook to access the toast context.
 * @returns The value of the toast context, including the list of toasts and functions to create and destroy toasts.
 */
export const useToast = () => useContext(toastContext);
