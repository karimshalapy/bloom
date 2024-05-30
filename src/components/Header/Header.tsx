import LogoWithText from "@/assets/logo-with-text.svg";
import Logo from "@/assets/logo.svg";
import { CartButton } from "@/components";
import type { FC } from "react";
import classes from "./Header.module.css";

/**
 * Header component to display the main header of the application.
 * @component
 */
export const Header: FC = () => {
  return (
    <header className={classes.header}>
      <div aria-hidden />
      <img
        className={classes.logoWithText}
        src={LogoWithText}
        alt="Bloom Logo"
        draggable={false}
      />
      <img
        className={classes.logo}
        src={Logo}
        alt="Bloom Logo"
        draggable={false}
      />
      <CartButton />
    </header>
  );
};

export default Header;
