import { FC, PropsWithChildren } from "react";
import classes from "./DefaultLayout.module.css";
import { Footer, Header } from "@/components";

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.defaultLayout}>
      <Header />
      <main className={classes.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
