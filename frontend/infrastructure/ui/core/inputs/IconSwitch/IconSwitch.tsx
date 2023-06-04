"use client";

import { ComponentProps, ReactNode } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

import styles from "./IconSwitch.module.scss";

type IconSwitchProps = {
  id: string;
  checkedIcon: ReactNode;
  uncheckedIcon?: ReactNode;
} & ComponentProps<"input">;

export const IconSwitch = (props: IconSwitchProps) => {
  const { id, checkedIcon, uncheckedIcon, className, checked, ...restProps } =
    props;

  return (
    <div className={classNames(styles.wrapper, className)} tabIndex={0}>
      <input id={id} type="checkbox" className={styles.input} {...restProps} />
      <label htmlFor={id} className={styles.label}>
        <div
          className={classNames(styles.icon, {
            [styles.icon__checked]: checked,
          })}
        >
          {checked && <motion.div className={styles.indicator} layoutId={id} />}
          {checkedIcon}
        </div>
        <div
          className={classNames(styles.icon, {
            [styles.icon__checked]: !checked,
          })}
        >
          {!checked && (
            <motion.div className={styles.indicator} layoutId={id} />
          )}
          {uncheckedIcon}
        </div>
      </label>
    </div>
  );
};
