import { FC } from "react";
import classes from "./Footer.module.css";
import chromaticImgSrc from "@/assets/chromatic.svg";

/**
 * Footer component for the website.
 * @component
 */
export const Footer: FC = () => {
  return (
    <footer className={classes.footer}>
      <small className={classes.footerContent}>
        This is a demo website that was done for a task for{" "}
        <a href="https://tangent.co/" rel="noreferrer" target="_blank">
          Tangent Marketing Services Limited
        </a>{" "}
        by{" "}
        <a
          href="https://karimshalapy.github.io/"
          rel="noreferrer"
          target="_blank"
        >
          Karim Shalapy
        </a>
        . All rights reserved &copy; {new Date().getFullYear()}.
      </small>
      <a
        href="https://www.chromatic.com/library?appId=66575276813412991c16a5b9&branch=main"
        title="Storybook Chromatic Library"
        rel="noreferrer"
        target="_blank"
      >
        <img
          className={classes.chromaticLogo}
          src={chromaticImgSrc}
          alt="Chromatic Logo"
        />
      </a>
    </footer>
  );
};

export default Footer;
