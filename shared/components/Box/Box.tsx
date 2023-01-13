import { ComponentPropsWithoutRef, ReactNode } from "react";
import classNames from "classnames";

import styles from "./Box.module.scss";

type BoxProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export const Box = (props: BoxProps) => {
  const { children, className, ...rest } = props;

  const finalClass = classNames(className, styles.box);

  return (
    <div className={finalClass} {...rest}>
      {children}
    </div>
  );
};
