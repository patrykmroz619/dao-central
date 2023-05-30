import { forwardRef } from "react";
import classNames from "classnames";

import { BaseInput, BaseInputProps } from "../BaseInput";
import styles from "./TextInput.module.scss";

type TextInputProps = {
  label: string;
  wrapperClassName?: string;
  helperText?: string | null;
} & BaseInputProps;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { label, wrapperClassName, helperText, isSuccess, isError, ...rest } =
      props;

    const wrapperClass = classNames(styles.wrapper, wrapperClassName);
    const helperTextClass = classNames(styles.helperText, {
      [styles.helperText__success]: isSuccess,
      [styles.helperText__error]: isError,
    });

    return (
      <div className={wrapperClass}>
        <label className={styles.label}>{label}</label>
        <BaseInput
          ref={ref}
          isSuccess={isSuccess}
          isError={isError}
          {...rest}
        />
        {helperText && <p className={helperTextClass}>{helperText}</p>}
      </div>
    );
  }
);
