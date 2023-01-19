import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";
import { Loader, IconProps } from "react-feather";

import styles from "./Spinner.module.scss";

type SpinnerProps = {
  iconProps?: IconProps;
} & ComponentPropsWithoutRef<"span">;

export const Spinner = (props: SpinnerProps) => {
  const { className, iconProps, ...rest } = props;

  const finalClass = classNames(styles.spinner, className);

  return (
    <span className={finalClass} {...rest}>
      <Loader {...iconProps} />
    </span>
  );
};
