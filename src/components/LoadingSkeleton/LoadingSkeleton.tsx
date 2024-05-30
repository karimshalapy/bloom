import clsx from "clsx";
import classes from "./LoadingSkeleton.module.css";
import { CSSProperties, ElementType, FC, HTMLAttributes } from "react";

/** Props for the LoadingSkeleton component.*/
interface LoadingSkeletonProps extends HTMLAttributes<HTMLElement> {
  /** The HTML element or custom component to render.*/
  as?: Exclude<ElementType, "input" | "textarea">;
  /** Height of the loading skeleton element. */
  height?: CSSProperties["height"];
  /** Width of the loading skeleton element. */
  width?: CSSProperties["width"];
  /** Whether the loading skeleton should be displayed inline. */
  inline?: boolean;
}

/**
 * LoadingSkeleton component to show a loading placeholder.
 * @component
 */
export const LoadingSkeleton: FC<LoadingSkeletonProps> = ({
  as: Comp = "div",
  className,
  height = "auto",
  width = "auto",
  inline = false,
  ...props
}) => {
  return (
    <Comp
      className={clsx(
        classes.loadingSkeleton,
        inline && classes.inline,
        className
      )}
      style={{ height, width }}
      aria-hidden
      data-testid="loading-skeleton"
      {...props}
    >
      &nbsp;
    </Comp>
  );
};

export default LoadingSkeleton;
