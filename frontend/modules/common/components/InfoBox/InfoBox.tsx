import { ComponentPropsWithoutRef, ReactNode } from "react";
import classNames from "classnames";

import styles from "./InfoBox.module.scss";

export enum INFO_BOX_VARIANT {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  DANGER = "DANGER",
}

type InfoBoxProps = {
  variant?: INFO_BOX_VARIANT;
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export const InfoBox = (props: InfoBoxProps) => {
  const {
    variant = INFO_BOX_VARIANT.INFO,
    className,
    children,
    ...rest
  } = props;

  const finalClass = classNames(styles.infoBox, className, {
    [styles.infoBox__info]: variant === INFO_BOX_VARIANT.INFO,
    [styles.infoBox__success]: variant === INFO_BOX_VARIANT.SUCCESS,
    [styles.infoBox__danger]: variant === INFO_BOX_VARIANT.DANGER,
  });

  return (
    <div className={finalClass} {...rest}>
      {children}
    </div>
  );
};
