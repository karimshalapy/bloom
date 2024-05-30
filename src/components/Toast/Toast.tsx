import { ReactNode } from "react";
import { useToast } from "@/context";
import classes from "./Toast.module.css";
import { Button } from "@/components";
import { Info, X } from "@phosphor-icons/react";

/** Interface defining properties for a Toast component. */
export interface ToastProps {
  /** Unique identifier for the toast. */
  id: string;
  /** Content to be displayed in the toast body. */
  content: ReactNode;
  /** Optional title to be displayed above the content. */
  title?: ReactNode;
  /** Flag indicating if a close button should be displayed. Defaults to true. */
  hasCloseButton?: boolean;
}

/**
 * Toast component that displays informational messages with optional title and close button.
 * @component
 */
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
        <Info role="presentation" className={classes.toastIcon} />
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
            <X role="img" aria-label="Close" />
          </Button>
        </div>
      )}
    </div>
  );
}
