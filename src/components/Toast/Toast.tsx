import { ReactNode } from "react";
import { useToast } from "@/context";
import classes from "./Toast.module.css";
import { Button } from "@/components";
import { Info, X } from "@phosphor-icons/react";

export interface ToastProps {
  id: string;
  content: ReactNode;
  title?: ReactNode;
  hasCloseButton?: boolean;
}

export function Toast({
  id,
  content,
  hasCloseButton = true,
  title,
}: ToastProps) {
  const { destroy } = useToast();

  return (
    <div role="alert" className={classes.toast} data-testid="toast" id={id}>
      <div className={classes.toastContentWrapper}>
        <Info className={classes.toastIcon} />
        <div className="mr-2 py-2">
          {title && <p className={classes.toastTitle}>{title}</p>}
          {content}
        </div>
      </div>

      {hasCloseButton && (
        <div className="flex items-start gap-2">
          <Button
            aria-label="Close"
            variant="ghost"
            square
            reverse
            onClick={destroy.bind(null, id)}
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
}
