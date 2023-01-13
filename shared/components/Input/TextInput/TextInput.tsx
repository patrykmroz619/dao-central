import { forwardRef } from "react";
import classNames from "classnames";

import { BaseInput, BaseInputProps } from "../BaseInput";
import styles from "./TextInput.module.scss";

type TextInputProps = {
  label: string;
  wrapperClassName?: string;
} & BaseInputProps;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { label, wrapperClassName, ...rest } = props;

    const wrapperClass = classNames(styles.wrapper, wrapperClassName);

    return (
      <div className={wrapperClass}>
        <label className={styles.label}>{label}</label>
        <BaseInput ref={ref} {...rest} />
      </div>
    );
  }
);
