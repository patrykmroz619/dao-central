import classNames from "classnames";

import { BaseInput, BaseInputProps } from "../BaseInput";
import styles from "./TextInput.module.scss";

type TextInputProps = {
  label: string;
  wrapperClassName?: string;
} & BaseInputProps;

export const TextInput = (props: TextInputProps) => {
  const { label, wrapperClassName, ...rest } = props;

  const wrapperClass = classNames(styles.wrapper, wrapperClassName);

  return (
    <div className={wrapperClass}>
      <label className={styles.label}>{label}</label>
      <BaseInput {...rest} />
    </div>
  );
};
