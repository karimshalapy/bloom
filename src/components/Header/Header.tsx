import { FC } from "react";
import classes from "./Header.module.css";
import LogoWithText from "@/assets/logo-with-text.svg";
import Logo from "@/assets/logo.svg";
import { Button, ButtonVariant } from "../Button/Button";
import { ShoppingCart } from "@phosphor-icons/react";

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
      {/* TODO: add cart functionality */}
      <Button variant={ButtonVariant.ghost} square>
        <ShoppingCart role="img" aria-label="Shopping Cart" size={24} />
      </Button>
    </header>
  );
};

export default Header;
