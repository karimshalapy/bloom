import {
  ElementType,
  useEffect,
  useId,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import classes from "./Sheet.module.css";
import { createPortal } from "react-dom";
import { Button, ButtonSize, ButtonVariant } from "../Button/Button";
import { X } from "@phosphor-icons/react";
import { usePreventBodyScroll } from "@/hooks";

/** Props for the Sheet component.*/
interface SheetProps extends PropsWithChildren {
  /** The trigger element that opens the sheet.*/
  trigger: ReactNode;
  /** Additional class name for the trigger wrapper.*/
  triggerWrapperClassName?: string;
  /** The title of the sheet.*/
  title: ReactNode;
  /** The description of the sheet.*/
  description?: ReactNode;
  /** The heading level for the title.*/
  headingLevel?: Extract<ElementType, `h${number}`>;
}

/**
 * Component for displaying a sheet (modal-like) element.
 * @component
 */
export const Sheet: FC<SheetProps> = ({
  children,
  trigger,
  triggerWrapperClassName,
  description,
  title,
  headingLevel: Heading = "h2",
}) => {
  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLElement>(null);

  usePreventBodyScroll(open);

  // Implements a focus trap
  useEffect(() => {
    if (open) {
      const sheetElement = sheetRef.current;
      if (!sheetElement) return;
      const focusableElements = sheetElement.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      firstElement.focus();

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Tab") {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      const handleEscapeKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      sheetElement.addEventListener("keydown", handleTabKeyPress);
      sheetElement.addEventListener("keydown", handleEscapeKeyPress);

      return () => {
        sheetElement.removeEventListener("keydown", handleTabKeyPress);
        sheetElement.removeEventListener("keydown", handleEscapeKeyPress);
      };
    }
  }, [open]);

  return (
    <>
      <div
        className={triggerWrapperClassName}
        onClick={() => setOpen((prev) => !prev)}
        data-testid="sheet-trigger-wrapper"
      >
        {trigger}
      </div>
      {open &&
        createPortal(
          <div className={classes.sheetWrapper}>
            <div
              className={classes.overlay}
              onClick={setOpen.bind(null, false)}
              aria-hidden
              data-testid="sheet-overlay"
            />
            <aside
              className={classes.sheetContent}
              ref={sheetRef}
              aria-labelledby={titleId}
              {...(description ? { "aria-describedby": descriptionId } : {})}
              role="dialog"
            >
              <Heading id={titleId}>{title}</Heading>
              {description && <p id={descriptionId}>{description}</p>}
              {children}
              <Button
                className={classes.closeBtn}
                size={ButtonSize.sm}
                variant={ButtonVariant.ghost}
                square
                onClick={setOpen.bind(null, false)}
              >
                <X role="img" aria-label="Close" />
              </Button>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
};

export default Sheet;
