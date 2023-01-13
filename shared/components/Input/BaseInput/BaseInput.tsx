import { ComponentPropsWithoutRef, forwardRef } from "react";
import classNames from "classnames";

import styles from "./BaseInput.module.scss";

export type BaseInputProps = ComponentPropsWithoutRef<"input">;

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    const finalClass = classNames(className, styles.input);

    return <input ref={ref} className={finalClass} {...rest} />;
  }
);
