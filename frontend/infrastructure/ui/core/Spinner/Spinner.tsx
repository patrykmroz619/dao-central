import { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";

import styles from "./Spinner.module.scss";

type SpinnerProps = {
  size?: number;
} & ComponentPropsWithoutRef<"span">;

export const Spinner = (props: SpinnerProps) => {
  const { className, size = 50, ...rest } = props;

  const finalClass = classNames(styles.spinner, className);

  return (
    <span
      className={finalClass}
      style={{ width: size, height: size }}
      {...rest}
    >
      <span className={styles.spinner__item} />
      <span className={styles.spinner__item} />
    </span>
  );
};
