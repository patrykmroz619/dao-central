import classNames from "classnames";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./DefaultPageWrapper.module.scss";

type DefaultPageWrapperProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export const DefaultPageWrapper = (props: DefaultPageWrapperProps) => {
  const { children, className } = props;

  const finalClass = classNames(styles.wrapper, className);

  return <div className={finalClass}>{children}</div>;
};
