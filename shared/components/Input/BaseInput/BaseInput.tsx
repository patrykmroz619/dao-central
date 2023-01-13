import { ComponentPropsWithoutRef, forwardRef } from "react";
import classNames from "classnames";

import styles from "./BaseInput.module.scss";

export type BaseInputProps = ComponentPropsWithoutRef<"input"> & {
  isError?: boolean;
  isSuccess?: boolean;
};

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    const { className, isError, isSuccess, ...rest } = props;

    const finalClass = classNames(className, styles.input, {
      [styles.input__success]: isSuccess,
      [styles.input__error]: isError,
    });

    return <input ref={ref} className={finalClass} {...rest} />;
  }
);
