import { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";

import styles from "./Separator.module.scss";

type SeparatorProps = ComponentPropsWithoutRef<"div">;

export const Separator = (props: SeparatorProps) => {
  const { className, ...restProps } = props;

  return (
    <div className={classNames(className, styles.separator)} {...restProps} />
  );
};
