import { useEffect, useRef, useState, type FC } from "react";
import type { ToastProps } from "@/components";
import { toastContext } from "./toastContext";
import type { ToastConfig, ToastProviderProps } from "./toastTypes";

export const ToastProvider: FC<ToastProviderProps> = ({
  closeAfter: closeAfterProperty = 3000,
  children,
}) => {
  const incrementalId = useRef(0);
  const activeTimeouts = useRef<{ id: string; timeout: NodeJS.Timeout }[]>([]);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const destroy = (id: string) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));

    activeTimeouts.current = activeTimeouts.current.filter(
      ({ id: timeoutId, timeout }) => {
        if (timeoutId === id) {
          clearTimeout(timeout);
          return false;
        }
        return true;
      }
    );
  };
  const toast = ({ closeAfter, ...toastConfig }: ToastConfig) => {
    const shouldCloseAfter = closeAfter || closeAfterProperty;
    const id = `toast-${incrementalId.current++}`;
    setToasts((previous) => [{ id, ...toastConfig }, ...previous]);
    if (shouldCloseAfter && shouldCloseAfter !== "never") {
      activeTimeouts.current.push({
        id,
        timeout: setTimeout(destroy.bind(null, id), shouldCloseAfter),
      });
    }
  };

  useEffect(
    () => () => {
      activeTimeouts.current.forEach(({ timeout }) => clearTimeout(timeout));
    },
    []
  );

  return (
    <toastContext.Provider value={{ toasts, toast, destroy }}>
      {children}
    </toastContext.Provider>
  );
};
