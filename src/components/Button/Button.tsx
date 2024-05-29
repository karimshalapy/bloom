import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  forwardRef,
} from "react";
import classes from "./Button.module.css";
import { ArrowClockwise } from "@phosphor-icons/react";

/** Represents the base size for the button. */
export const ButtonSize = {
  /** Represents the base size for the button.*/
  base: "base",
  /** Represents a larger size for the button.*/
  lg: "lg",
  /** Represents a smaller size for the button.*/
  sm: "sm",
} as const;

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

/** An enum-like object representing the different variants available for a button */
export const ButtonVariant = {
  /**  Represents a solid button with a filled background. */
  solid: "solid",
  /**  Represents a ghost button with a transparent background and border. */
  ghost: "ghost",
  /**  Represents an outlined button with a border and no background. */
  outlined: "outlined",
} as const;
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

/** Properties for a Button component. Extends the standard HTMLButtonElement attributes. */
export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /** Optional size of the button. Defaults to `base` if not set. */
  size?: ButtonSize;
  /** Optional variant of the button. Defaults to `solid` if not set. */
  variant?: ButtonVariant;
  /** Flag indicating if the button is in a loading state. */
  loading?: boolean;
  /** Content to be placed before the button content. */
  slotPrefix?: ReactNode;
  /** Content to be placed after the button content. */
  slotSuffix?: ReactNode;
  /** Flag indicating if the button should be square shaped. */
  square?: boolean;
  /** Flag indicating if the button content should be reversed. */
  reverse?: boolean;
}

/**
 * The base button component in the app, that can be rendered as a button or link.
 * It renders all the different variants with their divergents and sizes.
 * @component
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, reference) => {
    const {
      className,
      size = ButtonSize.base,
      variant = ButtonVariant.solid,
      square,
      children,
      slotPrefix,
      slotSuffix,
      loading = false,
      reverse = false,
      ...attributes
    } = props;

    return (
      <button
        ref={reference}
        type="button"
        className={clsx(
          classes.button,
          classes[variant],
          classes[size],
          square && classes.square,
          reverse && classes.reverse,
          className
        )}
        data-testid="button"
        {...attributes}
      >
        {loading ? <ArrowClockwise className={classes.loader} /> : slotPrefix}
        {children}
        {slotSuffix}
      </button>
    );
  }
);
