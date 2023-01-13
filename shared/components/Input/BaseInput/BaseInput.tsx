import { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";

import styles from "./BaseInput.module.scss";

export type BaseInputProps = ComponentPropsWithoutRef<"input">;

export const BaseInput = (props: BaseInputProps) => {
  const { className, ...rest } = props;

  const finalClass = classNames(className, styles.input);

  return <input className={finalClass} {...rest} />;
};
