import { FC } from "react";
import clsx from "clsx";
import { useToast } from "@/context";
import { Toast } from "@/components";
import classes from "./ToastGroup.module.css";
import { createPortal } from "react-dom";

interface ToastGroupProps {
  className?: string;
}

export const ToastGroup: FC<ToastGroupProps> = ({ className }) => {
  const { toasts } = useToast();

  return createPortal(
    toasts.length > 0 && (
      <aside
        className={clsx(classes.toastGroup, className)}
        aria-live="assertive"
        data-testid="toast-toast-group"
      >
        <div className={classes.toastListWrapper}>
          <ul className={classes.toastList}>
            {toasts.map((toast) => (
              <li key={toast.id}>
                <Toast {...toast} />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    ),
    document.body
  );
};

export default ToastGroup;
