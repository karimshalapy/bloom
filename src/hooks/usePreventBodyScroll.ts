import { useLayoutEffect } from "react";

/**
 * Custom hook to prevent body scroll when a condition is met.
 * @param enabled - Whether to enable body scroll prevention.
 */
export const usePreventBodyScroll = (enabled: boolean) => {
  useLayoutEffect(() => {
    if (enabled) {
      document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.paddingRight = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.paddingRight = "";
      document.documentElement.style.overflow = "";
    };
  }, [enabled]);
};
