import { ReactNode } from "react";

import styles from "./DefaultPageWrapper.module.scss";

type DefaultPageWrapperProps = {
  children: ReactNode;
};

export const DefaultPageWrapper = ({ children }: DefaultPageWrapperProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};
